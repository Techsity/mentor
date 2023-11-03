import React from "react";
import StepOneMentorOnboarding from "./StepOneMentorOnboarding";
import MentorOnboardingStepsHeader from "../../../../ui/atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../ui/atom/icons/svgs";

const MentorOnboardingSteps = () => {
	return (
		<div className="flex h-full flex-col md:flex-row justify-between items-start max-w-[75dvw] 2xl:max-w-[60dvw] mx-auto md:py-[20dvh] pb-20 min-h-screen">
			<div className="">
				<MentorOnboardingStepsHeader />
				<div className="">
					<StepOneMentorOnboarding />
				</div>
				<div className="">
					<StepOneMentorOnboarding />
				</div>
			</div>
			<div className="pb-10 md:pb-0 md:flex hidden sticky top-24 h-full">
				<MentorOnboardingSvg
					width={358}
					height={345}
					className="animate__animated animate__fadeInDown"
				/>
			</div>
		</div>
	);
};

export default MentorOnboardingSteps;
