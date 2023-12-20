import React, { MouseEvent, useState } from "react";
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
import Projects from "./Projects";
import WorkHistory from "./WorkHistory";
import { PrimaryButton } from "../../../../../atom/buttons";
import { IMentorSkills } from "../../../../../../../interfaces/mentor.interface";

const StepTwoMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const emptySkillState: IMentorSkills = { skill_name: "", years_of_exp: 0 };
	const [currentSkill, setCurrentSkill] = useState<IMentorSkills>(emptySkillState);

	const addSkill = (skill: IMentorSkills) => {
		if (skill) {
			if (onboardingMentor.skills.length < 5) {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						skills: [...onboardingMentor.skills, skill],
					}),
				);
				setCurrentSkill(emptySkillState);
			} else {
				toast.error("Skills limit reached!", ToastDefaultOptions({ id: "error", theme: "dark" }));
			}
		}
	};

	const removeSkill = (skillToRemove: IMentorSkills) => {
		if (skillToRemove) {
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					skills: onboardingMentor.skills.filter((skill) => skill !== skillToRemove),
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
				First, what are your top skills, how many years of experience do you have, then where have you worked,
				what project have you completed?
			</p>
			<div className="grid gap-5 mt-8">
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">What are your top Skills? (Up to 5)</h1>
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
						<div className="flex-grow">
							<TagsInput
								textLength={30}
								addTag={(tag) =>
									setCurrentSkill((prev) => {
										return { ...prev, skill_name: tag };
									})
								}
								tagsState={onboardingMentor.skills.map((item) => item.skill_name)}
								showSelectedTags={false}
								value={currentSkill.skill_name}
								showAddBtn={false}
								placeholder="skill"
							/>
						</div>
						<div className="sm:max-w-[30%] md:max-w-[25%]">
							<TagsInput
								textLength={2}
								addTag={(tag) => {
									setCurrentSkill((prev) => {
										return { ...prev, years_of_exp: parseInt(tag) };
									});
								}}
								tagsState={onboardingMentor.skills.map((item) => item.years_of_exp.toString())}
								value={currentSkill.years_of_exp.toString()}
								showAddBtn={false}
								showSelectedTags={false}
								placeholder="years of exp"
							/>
						</div>
						<div className="flex justify-start">
							<PrimaryButton
								onClick={() => {
									if (
										onboardingMentor.skills.length > 0 &&
										onboardingMentor.skills.every(
											(item) => item.skill_name === currentSkill.skill_name,
										)
									) {
										toast.info(
											"Tag has aleady been added!",
											ToastDefaultOptions({
												id: "info",
												theme: "dark",
											}),
										);
										return;
									}
									if (currentSkill.skill_name && currentSkill.years_of_exp > 0) {
										addSkill(currentSkill);
									} else if (isNaN(currentSkill.years_of_exp)) {
										toast.error(
											"Invalid Input for Year of Experience.",
											ToastDefaultOptions({
												id: "info",
												theme: "dark",
											}),
										);
									}
								}}
								title="Add"
								className="flex justify-center w-full px-5 p-4 h-full"
							/>
						</div>
					</div>
					{onboardingMentor.skills.length > 0 && (
						<div className="mt-2 px-2 pt-2 py-6 flex flex-wrap rounded border border-[#00D569] bg-[#70C5A13A] animate__fadeIn animate__animated animate__fastest overflow-hidden">
							{onboardingMentor.skills.map((tag, id) => (
								<span
									key={id}
									className="animate__fadeInDown animate__animated flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-[#fff]">
									{tag.skill_name} | {tag.years_of_exp}y
									<svg
										onClick={() => {
											removeSkill(tag);
										}}
										className="h-5 w-5 ml-3"
										viewBox="0 0 20 20"
										fill="#d31119">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
							))}
						</div>
					)}
				</div>
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">How many years of professional working experience?</h1>
					<CustomTextInput
						type="number"
						max={"40"}
						min="1"
						inputMode="numeric"
						onChange={(e) =>
							dispatch(
								setOnboardingMentor({
									...onboardingMentor,
									yearsOfExp: Number(e.target.value),
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
				<WorkHistory />
				<Projects />
			</div>
		</div>
	);
};

export default StepTwoMentorOnboarding;
