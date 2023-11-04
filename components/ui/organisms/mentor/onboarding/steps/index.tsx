import React, { useState } from "react";
import StepOneMentorOnboarding from "./StepOneMentorOnboarding";
import MentorOnboardingStepsHeader from "../../../../atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../atom/icons/svgs";
import { PrimaryButton } from "../../../../atom/buttons";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import StepTwoMentorOnboarding from "./StepTwoMentorOnboarding";
import { scrollToTop } from "../../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../redux/reducers/features/onboardingSlice";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { currentUser } from "../../../../../../redux/reducers/features/authSlice";

const MentorOnboardingSteps = () => {
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const totalSteps = 4;
	const [currentStep, setCurrentStep] = useState<number>(
		onboardingMentor.currentStep || 1,
	);
	const [loading, setLoading] = useState<boolean>(false);

	const moveToNextStep = () => {
		setTimeout(function () {
			if (currentStep < totalSteps) {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						currentStep: onboardingMentor.currentStep + 1,
					}),
				);
				setCurrentStep((prev) => prev + 1);
				setLoading(false);
				scrollToTop();
			}
		}, 1500);
	};
	const handleNext = () => {
		setLoading(true);
		if (onboardingMentor) {
			if (currentStep === 1) {
				if (onboardingMentor.bio && onboardingMentor.jobTitle) {
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
			if (currentStep === 2) {
				if (onboardingMentor.bio && onboardingMentor.jobTitle) {
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
		} else {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-full flex-col md:flex-row justify-between items-start max-w-[85dvw] 2xl:max-w-[65dvw] mx-auto md:py-[10dvh] pb-20 min-h-screen">
			<div className="w-full max-w-lg">
				<MentorOnboardingStepsHeader
					currentStep={currentStep}
					stepsLength={totalSteps}
				/>
				{currentStep === 1 ? (
					<StepOneMentorOnboarding />
				) : currentStep === 2 ? (
					<StepTwoMentorOnboarding />
				) : (
					<StepOneMentorOnboarding />
				)}
				<div className="my-6">
					<div className="flex justify-start items-center">
						<PrimaryButton
							title={loading ? "" : "Next"}
							icon={loading ? <ActivityIndicator /> : null}
							onClick={handleNext}
							className="px-8 p-2 flex justify-center"
						/>
					</div>
				</div>
			</div>
			<div className="pb-10 md:pb-0 md:flex hidden sticky top-24 h-full">
				<MentorOnboardingSvg
					width={400}
					height={350}
					className="animate__animated animate__fadeInRight"
				/>
			</div>
		</div>
	);
};

export default MentorOnboardingSteps;
