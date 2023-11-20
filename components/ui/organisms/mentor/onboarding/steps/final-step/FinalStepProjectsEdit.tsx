import React from "react";
import { FinalStepEditButton } from "./index";
import { onboardingMentor as onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { MentorProjects } from "../../../details";

const FinalStepProjectsEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	return (
		<div className="grid gap-2 my-2">
			<FinalStepEditButton title="Your Projects" editAction={() => {}} />
			<div className="">
				<MentorProjects projects={onboardingMentor.projects} reEdit />
			</div>
		</div>
	);
};

export default FinalStepProjectsEdit;
