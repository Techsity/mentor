import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";
import MentorCertificateCard from "../../../../../atom/cards/mentor/MentorCertificateCard";
import Certificates from "../step-three/Certificates";

const FinalStepCertificateEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const [editCertificates, setEditCertificates] = useState<boolean>(false);

	return (
		<div className="my-2">
			<FinalStepEditButton
				title="Your Certifications"
				editAction={() => setEditCertificates(!editCertificates)}
			/>
			{editCertificates ? (
				<Certificates reEdit />
			) : (
				onboardingMentor.certificates.map((cert, i) => (
					<MentorCertificateCard
						certificate={cert}
						className="bg-white"
						key={i}
					/>
				))
			)}
		</div>
	);
};

export default FinalStepCertificateEdit;
