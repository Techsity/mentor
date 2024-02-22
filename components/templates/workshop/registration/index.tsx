/* eslint-disable @next/next/no-img-element */
import React from "react";
import protectedPageWrapper from "../../../../pages/protectedPageWrapper";
import WorkshopContents from "../../../ui/organisms/workshop/body/WorkshopContents";
import { useSelector } from "react-redux";
import { workshopToRegister } from "../../../../redux/reducers/workshopSlice";
import { useRouter } from "next/router";
import { formatFollowersCount } from "../../../../utils";
import FreePurchaseForm from "../../../ui/atom/forms/purchase-form/FreePurchaseForm";
import WorkshopRegisterHeader from "../../../ui/organisms/workshop/register/Header";
import PaidPurchaseForm from "../../../ui/atom/forms/purchase-form/PaidPurchaseForm";
import CartSummary from "../../../ui/atom/cards/purchase/CartSummary";

const WorkshopRegistrationPageTemplate = () => {
	const workshop = useSelector(workshopToRegister);
	const router = useRouter();
	if (!workshop) {
		router.back();
		return;
	}

	return workshop.price === 0 ? (
		<>
			<WorkshopRegisterHeader {...workshop} />
			<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-4">
				<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full sm:mt-10 items-start">
					<div className="flex-grow w-full">
						<FreePurchaseForm reason="workshop" />
					</div>
					<WorkshopContents workshop={workshop} />
				</div>
			</div>
			<div className="bg-[#041606] min-w-screen p-8" />
		</>
	) : (
		<>
			<div className="md:flex justify-between item-start w-full h-full min-h-[80dvh]">
				<div className="min-w-[50%] pb-10">
					<PaidPurchaseForm reason="workshop" />
				</div>
				<div className="flex-grow sticky h-[69dvh] top-20 bg-[#F6F9F8]">
					<CartSummary reason="workshop" price={workshop.price} />
				</div>
			</div>
			<div className="bg-[#70C5A1] min-w-screen p-5 sticky bottom-0 h-auto">
				<div className="flex justify-center items-center gap-5 text-white">
					<p className="">Payment to:</p>
					<div className="my-2 sm:my-4 flex items-center gap-2">
						<div className="flex gap-1.5 items-center">
							<img
								src={workshop.mentor.user.avatar || "/assets/images/avatar.png"}
								className="rounded-full w-20"
								alt={workshop.mentor.user.name}
							/>
						</div>
						<div className="grid items-center max-w-sm font-[300] text-sm gap-1">
							<h1 className="font-semibold text-lg flex item-center gap-2">
								{workshop.mentor.user.name}
								{workshop.mentor.mentor_verified ? (
									<svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-1.5">
										<path
											d="M6.29757 11L4 8.60232L5.04704 7.50965L6.29757 8.81853L9.95296 5L11 6.09266L6.29757 11Z"
											fill="#0CF27E"
										/>
										<rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#70C5A1" />
									</svg>
								) : null}
							</h1>
							<p className="">{workshop.mentor.role} </p>
							<p className="flex gap-1 items-center">
								{/* {formatFollowersCount(workshop.mentor.courses.length)}{" "} */}
								20 Courses | {/* {formatFollowersCount(workshop.mentor.sessions)}{" "} */}
								{/* Sessions | */}
								{formatFollowersCount(workshop.mentor.followers.length)} Followers
								{/* |{" "} */}
								{/* {formatFollowersCount(
									workshop.mentor.subscribers,
								)}{" "}
								Subscribers */}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default protectedPageWrapper(WorkshopRegistrationPageTemplate);
