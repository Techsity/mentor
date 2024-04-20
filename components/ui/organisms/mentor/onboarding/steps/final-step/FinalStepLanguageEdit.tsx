import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import Languages from "../step-four/Languages";
import { useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/onboardingSlice";

const FinalStepLanguageEdit = () => {
	const [editLanguage, setEditLanguage] = useState<boolean>(false);
	const onboardingMentor = useSelector(onboardingMentorState);
	return (
		<div className="my-2 relative z-10">
			<FinalStepEditButton title="Languages Spoken" editAction={() => setEditLanguage(!editLanguage)} />
			<div className="my-4">
				{editLanguage ? (
					<Languages reEdit />
				) : (
					<span className="text-sm text-[#B1B1B1] flex gap-2 items-center">
						{onboardingMentor.languages &&
							onboardingMentor.languages.map((item, i) => {
								return (
									<span key={i} className="bg-white border border-[#00D569] p-1 px-2">
										{item}
									</span>
								);
							})}
					</span>
				)}
			</div>
		</div>
	);
};

export default FinalStepLanguageEdit;
