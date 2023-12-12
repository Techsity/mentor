import React from "react";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import EditWorkHistoryCard from "../../../../../atom/cards/mentor/onboarding/EditWorkHistoryCard";
import OnboardingWorkHistoryDisplayCard from "../../../../../atom/cards/mentor/onboarding/OnboardingWorkHistoryDisplayCard";
import { slugify } from "../../../../../../../utils";

const WorkHistory = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="">
			{!reEdit && <h1 className="text-sm text-[#B1B1B1]">Where have you worked?</h1>}
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.workHistory &&
					onboardingMentor.workHistory?.length >= 1 &&
					onboardingMentor.workHistory.map((work, index) => {
						return reEdit ? (
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
								experience={work}
								key={work.company}
							/>
						) : (
							<OnboardingWorkHistoryDisplayCard
								experience={work}
								key={work.company}
								onRemove={(exp) => {
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											workHistory: onboardingMentor?.workHistory?.filter(
												(work) =>
													slugify(work.company) !== slugify(exp?.company) &&
													work.job_role !== exp?.job_role &&
													exp.job_role === exp?.job_role,
											),
										}),
									);
								}}
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
