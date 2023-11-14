import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch } from "react-redux";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import CustomTextArea from "../../../../../atom/inputs/CustomTextArea";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import MentorExperienceCard from "../../../../../atom/cards/mentor/MentorExperienceCard";
import WorkHistory from "../step-two/WorkHistory";


const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	const bioInputRef = useRef<HTMLTextAreaElement>(null);
	const jobTitleInputRef = useRef<HTMLInputElement>(null);
	const [showSkillTagsEdit, setShowSkillTagsEdit] = useState<boolean>(false);
	const [showExperienceEdit, setShowExperienceEdit] =
		useState<boolean>(false);

	const StepEdit = ({
		step,
		title,
		editAction,
	}: {
		title: string;
		step?: number;
		editAction?: any;
	}) => (
		<div className="flex justify-between text-sm items-center font-[300]">
			<p className="text-[#A3A6A7]">{title}</p>
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

	const addSkill = (skill: string) => {
		if (skill)
			if (onboardingMentor.skills.length < 5) {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						skills: [...onboardingMentor.skills, skill],
					}),
				);
			} else {
				toast.error(
					"Skills limit reached!",
					ToastDefaultOptions({ id: "error", theme: "dark" }),
				);
			}
	};
	const removeSkill = (skillToRemove: string) => {
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
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Weldone, You are all set!
			</h1>
			<p className="text-sm text-black mb-5">
				Just so you know, here are the informations you provided. You
				can edit them if there are any errors.
			</p>
			<div className="grid gap-6">
				<div className="">
					<StepEdit
						title="what best describe you"
						editAction={() => {
							if (jobTitleInputRef.current)
								jobTitleInputRef.current.focus();
						}}
					/>
					<div className="flex justify-start text-sm items-center font-[300]">
						<CustomTextInput
							inputMode="text"
							typeof="text"
							ref={jobTitleInputRef}
							value={onboardingMentor.jobTitle}
							// readOnly={true}
							className="bg-transparent"
							containerProps={{
								className:
									"bg-transparent border-transparent w-full",
							}}
							onChange={(e) =>
								dispatch(
									setOnboardingMentor({
										...onboardingMentor,
										jobTitle: e.target.value,
									}),
								)
							}
						/>
					</div>
				</div>
				<div className="grid gap-2">
					<StepEdit
						title="About you"
						editAction={() => {
							if (bioInputRef.current)
								bioInputRef.current.focus();
						}}
					/>
					<div className="flex justify-start text-sm items-center font-[300]">
						<CustomTextArea
							inputMode="text"
							ref={bioInputRef}
							value={onboardingMentor.bio}
							className="resize-none h-[160px] bg-transparent"
							containerProps={{
								className:
									"bg-transparent border-transparent w-full",
							}}
							onChange={(e) =>
								dispatch(
									setOnboardingMentor({
										...onboardingMentor,
										bio: e.target.value,
									}),
								)
							}
						/>
					</div>
				</div>
				<div className="grid gap-2 my-2">
					<StepEdit
						title="Top Skills"
						editAction={() =>
							setShowSkillTagsEdit(!showSkillTagsEdit)
						}
					/>
					{showSkillTagsEdit ? (
						<TagsInput
							textLength={30}
							addTag={addSkill}
							onRemove={removeSkill}
							tagsState={onboardingMentor.skills}
							showSelectedTags
						/>
					) : (
						<div className="flex gap-4 flex-wrap text-sm items-center font-[300] max-w-md">
							{onboardingMentor.skills.map((skill) => (
								<span key={skill}>{skill}</span>
							))}
						</div>
					)}
				</div>
				<div className="grid gap-2">
					<StepEdit
						title="Your experiences"
						editAction={() =>
							setShowExperienceEdit(!showExperienceEdit)
						}
					/>
					{showExperienceEdit ? (
						<WorkHistory reEdit />
					) : (
						<div className="grid gap-3 animate__animated animate__fadeIn">
							{onboardingMentor.workHistory?.map((experience) => {
								return (
									<MentorExperienceCard
										className="bg-white"
										key={experience.company.name}
										experience={experience}
									/>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FinalMentorOnboardingStep;
