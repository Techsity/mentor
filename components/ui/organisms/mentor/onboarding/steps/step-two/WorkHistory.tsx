import React from "react";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
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
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											workHistory: updated,
										}),
									);
								}}
								experience={work}
								key={work.company.name}
							/>
						) : (
							<OnboardingWorkHistoryDisplayCard
								experience={work}
								key={work.company.name}
								onRemove={(exp) => {
									dispatch(
										setOnboardingMentor({
											...onboardingMentor,
											workHistory:
												onboardingMentor?.workHistory?.filter(
													(work) =>
														slugify(
															work.company.name,
														) !==
															slugify(
																exp?.company
																	.name,
															) &&
														work.position !==
															exp?.position &&
														exp.position ===
															exp?.position,
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
