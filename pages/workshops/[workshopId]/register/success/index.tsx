import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../../../components/ui/atom/loader/ActivityIndicator";
import { useRouter } from "next/router";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../../../../utils/confetti.config";
import { useDispatch, useSelector } from "react-redux";
import { onboardingUserState, setOnboardingUser } from "../../../../../redux/reducers/onboardingSlice";
import { setWorkshopToRegister, workshopToRegister } from "../../../../../redux/reducers/workshopSlice";
import { formatDateDifference } from "../../../../../utils";

const WorkshopSubscriptionSuccess = () => {
	const router = useRouter();
	const workshopId = router.query.workshopId;
	const dispatch = useDispatch();
	const workshop = useSelector(workshopToRegister);
	const [loading, setLoading] = useState<boolean>(false);

	const [celebrate, setCelebrate] = useState<boolean>(false);

	useEffect(() => {
		if (!workshop || !workshopId) router.replace(`/workshops`);
	}, [workshop, router]);

	useEffect(() => {
		if (workshop !== null) setCelebrate(true);
	}, []);

	if (!workshop) {
		return (
			<div className="min-h-screen items-center flex justify-center">
				<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
			</div>
		);
	}

	const navigateToProfile = () => {
		setLoading(true);
		router.replace("/profile/my-workshop").then((done) => {
			if (done) dispatch(setWorkshopToRegister(null));
		});
	};
	const workshopDuration = formatDateDifference(
		workshop.contents[workshop.contents.length - 1].date,
		workshop.scheduled_date,
	);
	return (
		<>
			<div className="flex flex-col lg:flex-row justify-between gap-5 lg:items-center md:min-h-[80vh] px-10 md:px-20">
				<Confetti active={celebrate} config={{ ...confettiConfig }} />
				<div className="flex-grow p-6 w-full lg:w-auto bg-[#0C202B]">
					<p className="text-sm capitalize text-white">
						workshop/{workshop.category.title}/<span className="text-[#CEFFEA]">{workshop.title}</span>
					</p>
					<h1 style={{ fontFamily: "Days One" }} className="text-white text-center text-2xl font-bold">
						{workshop.title}
					</h1>
					<div className="flex items-center justify-between text-sm">
						<p className="capitalize">{String(workshop?.level).split("_").join(" ")}</p>
						<p className="capitalize">{workshopDuration}</p>
					</div>
				</div>
				<div className="flex sm:items-center md:items-start sm:gap-5 md:gap-0 flex-col md:flex-col sm:flex-row sm:order-last order-first sm:pt-auto pt-6">
					<div className="lg:max-w-lg">
						<h1 className="text-4xl text-[#00D569] break-words" style={{ fontFamily: "Days One" }}>
							Congratulations!
						</h1>
						<div
							className="my-5 text-[#094B10] break-words max-w-lg tracking-tight"
							style={{ fontFamily: "Days One" }}>
							You have successfully registered for this workshop. Check your profile for the link to the
							workshop
						</div>
					</div>
					<PrimaryButton
						onClick={navigateToProfile}
						disabled={loading}
						title={!loading ? "Go to profile" : ""}
						icon={
							loading ? (
								<div className="flex justify-center items-center">
									<ActivityIndicator />
								</div>
							) : null
						}
						className="px-12 duration-300 p-3 text-center flex justify-center items-center"
					/>
				</div>
			</div>
		</>
	);
};

export default WorkshopSubscriptionSuccess;
