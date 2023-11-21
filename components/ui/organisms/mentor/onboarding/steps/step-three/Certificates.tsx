import React from "react";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import EditCertificateCard from "../../../../../atom/cards/mentor/onboarding/EditCertificateCard";

const Certificates = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="">
			{!reEdit && (
				<h1 className="text-sm text-[#B1B1B1] mb-3">
					Professional Certificates
				</h1>
			)}
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.certificates &&
					onboardingMentor.certificates.length >= 1 &&
					onboardingMentor.certificates.map((cert, i) => {
						return (
							<EditCertificateCard
								certs={onboardingMentor.certificates}
								key={i}
								reEdit
								existingCert={cert}
								updateCerts={(updated) =>
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											certificates: updated,
										}),
									)
								}
							/>
						);
					})}
			</div>
			<EditCertificateCard
				certs={onboardingMentor.certificates}
				updateCerts={(updated) =>
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							certificates: updated,
						}),
					)
				}
			/>
		</div>
	);
};

export default Certificates;
