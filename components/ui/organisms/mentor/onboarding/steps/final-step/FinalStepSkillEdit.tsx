import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FinalStepEditButton } from "./index";
import { onboardingMentorState, setOnboardingMentor } from "../../../../../../../redux/reducers/onboardingSlice";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import { IMentorSkills } from "../../../../../../../interfaces/mentor.interface";
import { PrimaryButton } from "../../../../../atom/buttons";

const FinalStepSkillEdit = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	const [showSkillTagsEdit, setShowSkillTagsEdit] = useState<boolean>(false);

	return (
		<div className="grid gap-2 my-2">
			<FinalStepEditButton title="Top Skills" editAction={() => setShowSkillTagsEdit(!showSkillTagsEdit)} />
			{showSkillTagsEdit ? (
				<SkillEdit
					skillsArr={[...onboardingMentor.skills]}
					onUpdateSkills={(skills) => dispatch(setOnboardingMentor({ ...onboardingMentor, skills }))}
				/>
			) : (
				<div className="grid grid-cols-2 gap-2 text-sm font-[300] max-w-md">
					{onboardingMentor.skills.map((skill, index) => (
						<span key={index}>
							{/* {index + 1}.  */}
							{skill.skill_name} {skill?.years_of_exp && "- " + skill?.years_of_exp + "y"}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export const SkillEdit = ({
	skillsArr,
	onUpdateSkills,
	limit = 5,
}: {
	skillsArr: IMentorSkills[];
	onUpdateSkills?: (skillsArr: IMentorSkills[]) => void;
	limit?: number;
}) => {
	const [skills, setSkills] = useState<IMentorSkills[]>([...skillsArr]);
	const emptySkillState = { skill_name: "", years_of_exp: "" };
	const [currentSkill, setCurrentSkill] = useState<typeof emptySkillState>({ ...emptySkillState });

	const addSkill = () => {
		console.log({ skills });
		if (currentSkill.skill_name.trim() !== "") {
			if (skills.length >= limit)
				return toast.error("Skills limit reached!", ToastDefaultOptions({ id: "error", theme: "dark" }));
			if (skills.every((item) => item.skill_name === currentSkill.skill_name)) {
				return toast.info(
					"Tag has already been added!",
					ToastDefaultOptions({
						id: "info",
						theme: "dark",
					}),
				);
			}
			setSkills((p) => {
				let updated = [...p];
				console.log({ updated });
				let skill = { ...currentSkill } as any;
				if (
					currentSkill.years_of_exp &&
					currentSkill.years_of_exp &&
					!isNaN(parseInt(currentSkill.years_of_exp))
				)
					skill.years_of_exp = parseInt(skill.years_of_exp);
				updated = [...updated, skill];
				if (onUpdateSkills) onUpdateSkills([...updated]);
				return updated;
			});
			setCurrentSkill(emptySkillState);
		}
	};

	const removeSkill = (skillToRemove: IMentorSkills) => {
		if (skillToRemove) {
			setSkills((p) => {
				return [...p].filter((skill) => skill !== skillToRemove);
			});
			if (onUpdateSkills) onUpdateSkills(skills.filter((skill) => skill !== skillToRemove));
		}
	};

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
				<div className="flex-grow">
					<TagsInput
						textLength={30}
						tagsState={skills.map((item) => item.skill_name)}
						showSelectedTags={false}
						value={currentSkill.skill_name}
						onChange={(value) => {
							console.log({ value });
							setCurrentSkill((prev) => {
								return { ...prev, skill_name: value as string };
							});
						}}
						showAddBtn={false}
						placeholder="skill"
					/>
				</div>
				<div className="sm:max-w-[30%] md:max-w-[25%]">
					<TagsInput
						textLength={2}
						tagsState={skills.map((item) => item.years_of_exp?.toString() || "")}
						value={currentSkill.years_of_exp?.toString()}
						onChange={(value: any) => {
							value = value.replace(/\D/g, "");
							setCurrentSkill((prev) => {
								return { ...prev, years_of_exp: String(value) };
							});
						}}
						showAddBtn={false}
						showSelectedTags={false}
						placeholder="years of exp"
					/>
				</div>
				<div className="flex justify-start">
					<PrimaryButton
						disabled={currentSkill.skill_name.trim() === ""}
						onClick={() => addSkill()}
						title="Add"
						className="flex justify-center w-full px-5 p-4 h-full"
					/>
				</div>
			</div>
			{skills.length > 0 && (
				<div className="mt-2 px-2 pt-2 py-6 flex flex-wrap rounded border border-[#00D569] bg-[#70C5A13A] animate__fadeIn animate__animated animate__fastest overflow-hidden">
					{skills.map((tag, id) => (
						<span
							key={id}
							className="animate__fadeInDown animate__animated flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-[#fff]">
							{tag.skill_name} {tag.years_of_exp && "- " + tag.years_of_exp + "y"}
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
		</>
	);
};

export default FinalStepSkillEdit;
