import React, { useState } from "react";
import StepOneMentorOnboarding from "./StepOneMentorOnboarding";
import MentorOnboardingStepsHeader from "../../../../ui/atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../ui/atom/icons/svgs";

type StepType = 1 | 2 | 3 | 4;

const MentorOnboardingSteps = () => {
	const totalSteps = 4;
	const [loading, setLoading] = useState<boolean>(false);
	const [currentStep, setCurrentStep] = useState<number>(1);

	const moveToNextStep = () => {
		setLoading(true);
		setTimeout(function () {
			if (currentStep < totalSteps) {
				setCurrentStep((prev) => prev + 1);
				setLoading(false);
			}
		}, 1500);
	};

	return (
		<div className="flex h-full flex-col md:flex-row justify-between items-start max-w-[85dvw] 2xl:max-w-[65dvw] mx-auto md:py-[10dvh] pb-20 min-h-screen">
			<div className="w-full max-w-lg">
				<MentorOnboardingStepsHeader
					currentStep={currentStep}
					stepsLength={totalSteps}
				/>
				{currentStep === 1 ? (
					<StepOneMentorOnboarding nextStep={moveToNextStep} />
				) : (
					<StepOneMentorOnboarding nextStep={moveToNextStep} />
				)}
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
