import React from "react";
import { useSelector } from "react-redux";
import { onboardingMentor as onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";

const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Weldone, You are all set!
			</h1>
			<p className="text-sm text-black">
				Just so you know, here are the information you told us about
				you. You can edit them if there are any errors.
			</p>
			<div className="grid gap-5 mt-8">
				<div className=""></div>
			</div>
		</div>
	);
};

export default FinalMentorOnboardingStep;
