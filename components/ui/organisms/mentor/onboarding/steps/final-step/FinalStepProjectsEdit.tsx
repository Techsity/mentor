import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { onboardingMentorState, setOnboardingMentor } from "../../../../../../../redux/reducers/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { MentorProjects } from "../../../details";
import EditProjectCard from "../../../../../atom/cards/mentor/onboarding/EditProjectCard";

const FinalStepProjectsEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const [showEdit, setShowEdit] = useState<boolean>(false);

	return (
		<div className="grid gap-2 my-2">
			<FinalStepEditButton title="Your Projects" editAction={() => setShowEdit(!showEdit)} />
			<div className="">
				{!showEdit ? (
					<MentorProjects projects={onboardingMentor.projects} reEdit />
				) : (
					<div className="grid gap-4">
						{onboardingMentor.projects.map((project, index) => (
							<EditProjectCard
								key={index}
								projectsArr={onboardingMentor.projects}
								existingProject={project}
								onUpdate={(updated) => {
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											projects: updated,
										}),
									);
								}}
								reEdit
							/>
						))}
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
				)}
			</div>
		</div>
	);
};

export default FinalStepProjectsEdit;
