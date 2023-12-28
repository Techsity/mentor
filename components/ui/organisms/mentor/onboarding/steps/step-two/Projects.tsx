import React from "react";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { slugify } from "../../../../../../../utils";
import EditProjectCard from "../../../../../atom/cards/mentor/onboarding/EditProjectCard";

const Projects = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="">
			<h1 className="text-sm text-[#B1B1B1] mb-3">Any Project(s) you worked on?</h1>
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.projects &&
					onboardingMentor.projects?.length >= 1 &&
					onboardingMentor.projects.map((project, index) => {
						const id = slugify(project.company);
						return (
							<EditProjectCard
								key={index}
								existingProject={project}
								projectsArr={onboardingMentor.projects}
								onUpdate={(updated) => {
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											projects: updated,
										}),
									);
								}}
							/>
						);
					})}
			</div>
			<EditProjectCard
				projectsArr={onboardingMentor.projects}
				onUpdate={(updated) => {
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							projects: updated,
						}),
					);
				}}
			/>
		</div>
	);
};

export default Projects;
