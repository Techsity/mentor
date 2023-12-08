import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";
import Education from "../step-three/Education";
import { slugify } from "../../../../../../../utils";
import MentorEducationCard from "../../../../../atom/cards/mentor/MentorEducationCard";

const FinalStepEducationEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const [editEducation, setEditEducation] = useState<boolean>(false);

	return (
		<div className="my-2">
			<FinalStepEditButton title="Your Education" editAction={() => setEditEducation(!editEducation)} />
			{!editEducation ? (
				onboardingMentor.education.length >= 1 && (
					<div className="flex flex-col gap-4 items-center mb-5 mt-2">
						{onboardingMentor.education.map((edu) => {
							const id = slugify(edu.school);
							return <MentorEducationCard {...{ education: edu }} key={id} className="bg-white" />;
						})}
					</div>
				)
			) : (
				<Education reEdit />
			)}
		</div>
	);
};

export default FinalStepEducationEdit;
