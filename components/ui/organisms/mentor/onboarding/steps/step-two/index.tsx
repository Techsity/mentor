import React, { MouseEvent, useRef, useState } from "react";
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
import Calendar from "react-calendar";
import WorkHistoryComponent from "./WorkHistoryComponent";

const StepTwoMentorOnboarding = () => {
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
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				Now tell us your experience
			</h1>
			<p className="text-sm text-black">
				First, what are your top skills, how many years of experience do
				you have, then where have you worked, what project have you
				completed?
			</p>
			<div className="grid gap-5 mt-8">
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">
						What are your top Skills? (Up to 5)
					</h1>
					<TagsInput
						textLength={30}
						addTag={addSkill}
						onRemove={removeSkill}
						tagsState={onboardingMentor.skills}
					/>
				</div>
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">
						How many years of experience?
					</h1>
					<CustomTextInput
						type="number"
						max={"40"}
						min="1"
						onChange={(e) =>
							dispatch(
								setOnboardingMentor({
									...onboardingMentor,
									yearsOfExp: parseInt(e.target.value),
								}),
							)
						}
						value={onboardingMentor.yearsOfExp}
						className="bg-white"
						containerProps={{
							className: "border border-[#00D569]",
						}}
					/>
				</div>
				<WorkHistoryComponent />
			</div>
		</div>
	);
};

export default StepTwoMentorOnboarding;
