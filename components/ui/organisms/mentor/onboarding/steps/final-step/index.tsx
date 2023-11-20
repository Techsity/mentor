import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch } from "react-redux";
import MentorExperienceCard from "../../../../../atom/cards/mentor/MentorExperienceCard";
import WorkHistory from "../step-two/WorkHistory";
import FinalStepAboutYouEdit from "./FinalStepAboutYouEdit";
import FinalStepSkillEdit from "./FinalStepSkillEdit";
import FinalStepExperienceEdit from "./FinalStepExperienceEdit";
import FinalStepProjectsEdit from "./FinalStepProjectsEdit";

const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Weldone, You are all set!
			</h1>
			<p className="text-sm text-black mb-5">
				Just so you know, here are the informations you provided. You
				can edit them if there are any errors.
			</p>
			<div className="grid gap-6">
				<FinalStepAboutYouEdit />
				<FinalStepSkillEdit />
				<FinalStepExperienceEdit />
				<FinalStepProjectsEdit />
			</div>
		</div>
	);
};
export const FinalStepEditButton = ({
	step,
	title,
	editAction,
}: {
	title: string;
	step?: number;
	editAction?: any;
}) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="flex justify-between text-sm items-center font-[300]">
			<p className="text-[#A3A6A7] capitalize">{title}</p>
			<p
				className="text-[#70C5A1] select-none cursor-pointer"
				onClick={() => {
					if (step)
						dispatch(
							setOnboardingMentor({
								...onboardingMentor,
								currentStep: step,
							}),
						);
					if (editAction) editAction();
				}}>
				Edit
			</p>
		</div>
	);
};
export default FinalMentorOnboardingStep;
