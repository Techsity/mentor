import React, { MouseEvent } from "react";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import Education from "./Education";
import Certificates from "./Certificates";

const StepThreeMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const addSkill = (skill: string) => {
		if (skill)
			if (onboardingMentor.skills.length < 5) {
				if (onboardingMentor.skills.includes(skill)) {
					toast.info(
						"Tag has aleady been added!",
						ToastDefaultOptions({ id: "info", theme: "dark" }),
					);
				} else {
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							skills: [...onboardingMentor.skills, skill],
						}),
					);
				}
			} else {
				toast.error(
					"Skills limit reached!",
					ToastDefaultOptions({ id: "error", theme: "dark" }),
				);
			}
	};
	const removeSkill = (skillToRemove: string) => (e: MouseEvent) => {
		if (skillToRemove) {
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					skills: onboardingMentor.skills.filter(
						(skill) => skill !== skillToRemove,
					),
				}),
			);
		}
	};

	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="-mt-5 text-[#00D569] text-xl sm:text-2xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				Your Education and Certifications
			</h1>
			<p className="text-sm text-black">
				First, what are your top skills, how many years of experience do
				you have, then where have you worked, what project have you
				completed.
			</p>
			<div className="grid gap-5 mt-8">
				<Education />
				<Certificates />
			</div>
		</div>
	);
};

export default StepThreeMentorOnboarding;
