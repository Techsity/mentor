import React from "react";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { slugify } from "../../../../../../../utils";
import EditEducationCard from "../../../../../atom/cards/mentor/onboarding/EditEducationCard";

const Education = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="">
			{!reEdit && <h1 className="text-sm text-[#B1B1B1]">Education</h1>}
			{onboardingMentor.education.length >= 1 && (
				<div className="flex flex-col gap-4 items-center mb-5 mt-2">
					{onboardingMentor.education.map((edu, i) => {
						const id = slugify(edu.school);
						return (
							<EditEducationCard
								key={id + i}
								reEdit={reEdit}
								exisitingEducation={edu}
								allEducationData={onboardingMentor.education}
								onUpdate={(updated) => {
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											education: updated,
										}),
									);
								}}
							/>
						);
					})}
				</div>
			)}
			<EditEducationCard
				allEducationData={onboardingMentor.education}
				onUpdate={(updated) => {
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							education: updated,
						}),
					);
				}}
			/>
		</div>
	);
};

export default Education;
