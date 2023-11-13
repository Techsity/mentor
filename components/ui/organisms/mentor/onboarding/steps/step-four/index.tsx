import React, { MouseEvent } from "react";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import Availability from "./Availability";
import Languages from "./Languages";


const StepFourMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Finally, Whats your availability like?
			</h1>
			<p className="text-sm text-black">
				Create the dates and time you would be available for mentorship
				sessions. As a bonus tip about you, Tell us The language
				you&apos;re fluent at (We added this so that mentee that
				preferred to be taught in a preferred language can reach you
				easily).
			</p>
			<div className="grid gap-5 mt-8">
				<Availability />
				<Languages />
			</div>
		</div>
	);
};

export default StepFourMentorOnboarding;
