import React, { ChangeEvent, useState } from "react";
import StepOneMentorOnboarding from "./StepOneMentorOnboarding";
import MentorOnboardingStepsHeader from "../../../../atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../atom/icons/svgs";
import { PrimaryButton } from "../../../../atom/buttons";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import StepTwoMentorOnboarding from "./StepTwoMentorOnboarding";

// type StepType = 1 | 2 | 3 | 4;

const MentorOnboardingSteps = () => {
	const totalSteps = 4;
	const [loading, setLoading] = useState<boolean>(false);
	const [currentStep, setCurrentStep] = useState<number>(2);
	const initialState: IMentorOnboardingState = {
		bio: "",
		jobTitle: "",
		skills: [],
		yearsOfExp: 0,
		workHistory: [],
	};
	const [state, setState] = useState<IMentorOnboardingState>(initialState);

	const moveToNextStep = () => {
		setTimeout(function () {
			if (currentStep < totalSteps) {
				setCurrentStep((prev) => prev + 1);
				setLoading(false);
			}
		}, 1500);
	};
	const handleNext = () => {
		setLoading(true);
		if (state) {
			if (currentStep === 1) {
				if (state.bio && state.jobTitle) {
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
			if (currentStep === 2) {
				if (state.bio && state.jobTitle) {
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
					<StepOneMentorOnboarding
						formState={state}
						setState={setState}
					/>
				) : currentStep === 2 ? (
					<StepTwoMentorOnboarding
						formState={state}
						setState={setState}
					/>
				) : (
					<StepOneMentorOnboarding
						formState={state}
						setState={setState}
					/>
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
