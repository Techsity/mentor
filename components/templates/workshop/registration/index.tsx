/* eslint-disable @next/next/no-img-element */
import React from "react";
import WorkshopContents from "../../../ui/organisms/workshop/body/WorkshopContents";
import { formatFollowersCount } from "../../../../utils";
import FreePurchaseForm from "../../../ui/atom/forms/purchase-form/FreePurchaseForm";
import PaidPurchaseForm from "../../../ui/atom/forms/purchase-form/PaidPurchaseForm";
import CartSummary from "../../../ui/atom/cards/purchase/CartSummary";
import { IWorkshop } from "../../../../interfaces";
import WorkshopDetailsPageHero from "../../../ui/organisms/workshop/hero";

const WorkshopRegistrationPageTemplate = ({ workshop }: { workshop: IWorkshop }) => {
	// const workshop = useSelector(workshopToRegister) as IWorkshop;
	return workshop.price === 0 ? (
		<>
			<WorkshopDetailsPageHero {...workshop} />
			<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-4">
				<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full sm:mt-10 items-start">
					<div className="flex-grow w-full">
						<FreePurchaseForm resource={workshop} reason="workshop" />
					</div>
					<WorkshopContents workshop={workshop} />
				</div>
			</div>
			<div className="bg-[#041606] min-w-screen p-8" />
		</>
	) : (
		<>
			<PaidPurchaseForm resource={workshop} reason="workshop" />
			<div className="bg-[#70C5A1] min-w-screen p-5 sticky bottom-0 h-auto">
				<div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-5 text-white">
					<p className="">Payment to:</p>
					<div className="my-2 sm:my-4 flex items-center gap-2">
						<div className="flex gap-1.5 items-center">
							<img
								src={workshop.mentor.user.avatar || "/assets/images/avatar.png"}
								className="rounded-full w-12"
								alt={workshop.mentor.user.name}
							/>
						</div>
						<div className="max-w-sm font-[300] text-sm">
							<h1 className="font-semibold text-lg flex item-center gap-2">
								{workshop.mentor.user.name}
								{workshop.mentor.mentor_verified && (
									<svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-1.5">
										<path
											d="M6.29757 11L4 8.60232L5.04704 7.50965L6.29757 8.81853L9.95296 5L11 6.09266L6.29757 11Z"
											fill="#fff"
										/>
										<rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#fff" />
									</svg>
								)}
							</h1>
							<p className="">{workshop.mentor.role} </p>
							<p className="flex gap-1 items-center">
								20 Courses | {formatFollowersCount(workshop.mentor.followers.length)} Followers
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkshopRegistrationPageTemplate;
