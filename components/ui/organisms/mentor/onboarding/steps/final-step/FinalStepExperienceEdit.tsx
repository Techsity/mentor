import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { onboardingMentor as onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";
import MentorExperienceCard from "../../../../../atom/cards/mentor/MentorExperienceCard";
import WorkHistory from "../step-two/WorkHistory";
import { useDispatch, useSelector } from "react-redux";

const FinalStepExperienceEdit = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const [showExperienceEdit, setShowExperienceEdit] =
		useState<boolean>(false);

	return (
		<div className="grid gap-2">
			<FinalStepEditButton
				title="Your experiences"
				editAction={() => setShowExperienceEdit(!showExperienceEdit)}
			/>
			{showExperienceEdit ? (
				<WorkHistory reEdit />
			) : (
				<div className="grid gap-3 animate__animated animate__fadeIn w-full">
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
	);
};

export default FinalStepExperienceEdit;
