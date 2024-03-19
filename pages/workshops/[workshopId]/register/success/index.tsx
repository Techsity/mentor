import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../../../components/ui/atom/loader/ActivityIndicator";
import { useRouter } from "next/router";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../../../../utils/confetti.config";
import { useDispatch, useSelector } from "react-redux";
import { onboardingUserState, setOnboardingUser } from "../../../../../redux/reducers/onboardingSlice";
import { setWorkshopToRegister, workshopToRegister } from "../../../../../redux/reducers/workshopSlice";

const WorkshopSubscriptionSuccess = () => {
	const router = useRouter();
	const workshopId = router.query.workshopId;
	const dispatch = useDispatch();
	const workshop = useSelector(workshopToRegister);
	const [loading, setLoading] = useState<boolean>(false);
	console.log({ workshopId, workshop });

	const [celebrate, setCelebrate] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!workshop || !workshopId) router.replace(`/workshops`);
	// }, [workshop, router]);

	// useEffect(() => {
	// 	if (workshop !== null) setCelebrate(true);
	// }, []);

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

	return (
		<>
			<div className="flex justify-between items-center min-h-[80vh] px-10 md:px-20">
				<Confetti active={celebrate} config={{ ...confettiConfig }} />
				<div className="">Card</div>
				<div className="">
					<h1 className="md:text-8xl text-4xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
						Congratulations!
					</h1>
					<div className="my-5 text-[#094B10]" style={{ fontFamily: "Days One" }}>
						You have successfully registered for this workshop. Check your profile for the link to the
						workshop
					</div>
					<div className="sm:flex grid gap-5 mt-5 items-center my-5">
						<PrimaryButton
							onClick={navigateToProfile}
							disabled={loading}
							title={!loading ? "Go to profile" : ""}
							icon={
								loading ? (
									<div className="flex justify-center">
										<ActivityIndicator />
									</div>
								) : null
							}
							className="px-12 duration-300 p-3 text-center"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkshopSubscriptionSuccess;
