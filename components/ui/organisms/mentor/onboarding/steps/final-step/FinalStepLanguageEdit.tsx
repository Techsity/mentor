import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import Languages from "../step-four/Languages";
import { useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";

const FinalStepLanguageEdit = () => {
	const [editAvailability, setEditAvailability] = useState<boolean>(false);
	const onboardingMentor = useSelector(onboardingMentorState);
	return (
		<div className="my-2 relative z-10">
			<FinalStepEditButton title="Languages Spoken" editAction={() => setEditAvailability(!editAvailability)} />
			<div className="my-4">
				{editAvailability ? (
					<Languages reEdit />
				) : (
					<>
						<span className="text-sm text-[#B1B1B1]">
							{onboardingMentor.languages && onboardingMentor.languages.join(", ")}
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default FinalStepLanguageEdit;
