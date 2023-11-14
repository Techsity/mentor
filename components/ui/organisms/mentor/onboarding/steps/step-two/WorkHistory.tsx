import React, { useState } from "react";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { slugify } from "../../../../../../../utils";
import EditWorkHistoryCard from "../../../../../atom/cards/mentor/onboarding/EditWorkHistoryCard";
import OnboardingWorkHistoryDisplayCard from "../../../../../atom/cards/mentor/onboarding/OnboardingWorkHistoryDisplayCard";

const WorkHistory = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const [editIndex, setEditIndex] = useState<number | false>(false);

	const handleRemoveWorkHistory = (companyName: string) => {
		if (onboardingMentor.workHistory) {
			const updatedWorkHistory = onboardingMentor.workHistory.filter(
				(work) => slugify(work.company.name) !== slugify(companyName),
			);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					workHistory: updatedWorkHistory,
				}),
			);
		}
	};

	return (
		<div className="">
			{!reEdit && (
				<h1 className="text-sm text-[#B1B1B1] mb-3">
					Where have you worked?
				</h1>
			)}
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.workHistory &&
					onboardingMentor.workHistory?.length >= 1 &&
					onboardingMentor.workHistory.map((work, index) => {
						return reEdit ? (
							<EditWorkHistoryCard
								allExperiences={
									onboardingMentor?.workHistory || []
								}
								updateWorkExperiences={(updated) => {
									console.log(updated);
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											workHistory: updated,
										}),
									);
								}}
								experience={work}
								onRemove={handleRemoveWorkHistory}
								key={work.company.name}
							/>
						) : (
							<OnboardingWorkHistoryDisplayCard
								experience={work}
								onRemove={handleRemoveWorkHistory}
								key={work.company.name}
							/>
						);
					})}
			</div>
			<EditWorkHistoryCard
				allExperiences={onboardingMentor?.workHistory || []}
				updateWorkExperiences={(updated) => {
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							workHistory: updated,
						}),
					);
				}}
			/>
		</div>
	);
};

export default WorkHistory;
