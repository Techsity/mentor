import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import {
	onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";

const FinalStepSkillEdit = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	const [showSkillTagsEdit, setShowSkillTagsEdit] = useState<boolean>(false);
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
		<div className="grid gap-2 my-2">
			<FinalStepEditButton
				title="Top Skills"
				editAction={() => setShowSkillTagsEdit(!showSkillTagsEdit)}
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
	);
};

export default FinalStepSkillEdit;
