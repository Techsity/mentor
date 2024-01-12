import React, { useMemo, useState } from "react";
import StepOneMentorOnboarding from "./step-one";
import MentorOnboardingStepsHeader from "../../../../atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../atom/icons/svgs";
import { PrimaryButton } from "../../../../atom/buttons";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import StepTwoMentorOnboarding from "./step-two";
import { scrollToTop } from "../../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { onboardingMentorState, setOnboardingMentor } from "../../../../../../redux/reducers/onboardingSlice";
import StepThreeMentorOnboarding from "./step-three";
import StepFourMentorOnboarding from "./step-four";
import FinalMentorOnboardingStep from "./final-step";

const MentorOnboardingSteps = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const totalSteps = 5;
	const currentStep = useMemo(() => onboardingMentor.currentStep, [onboardingMentor]);

	const [loading, setLoading] = useState<boolean>(false);

	const moveToNextStep = () => {
		setLoading(true);
		setTimeout(function () {
			if (currentStep < totalSteps) {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						currentStep: onboardingMentor.currentStep + 1,
					}),
				);
				scrollToTop();
			}
			setLoading(false);
		}, 1500);
	};

	const handleNext = () => {
		setLoading(true);
		if (currentStep < totalSteps) {
			if (currentStep === 1) {
				if (onboardingMentor.bio && onboardingMentor.role) {
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
			if (currentStep === 2 || currentStep === 3 || currentStep === 4) {
				moveToNextStep();
			}
		} else {
			setLoading(false);
		}
	};

	const handlePrev = () => {
		setLoading(false);
		scrollToTop();
		if (onboardingMentor)
			if (currentStep > 1) {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						currentStep: onboardingMentor.currentStep - 1,
					}),
				);
			}
	};

	return (
		<div className="flex h-full flex-col md:flex-row justify-between items-start sm:max-w-[85dvw] 2xl:max-w-[65dvw] mx-5 sm:mx-auto md:py-[10dvh] pb-20 min-h-screen">
			<div className="w-full md:max-w-[50%]">
				{currentStep <= totalSteps - 1 && (
					<MentorOnboardingStepsHeader currentStep={currentStep} stepsLength={totalSteps} />
				)}
				{currentStep === 1 ? (
					<StepOneMentorOnboarding />
				) : currentStep === 2 ? (
					<StepTwoMentorOnboarding />
				) : currentStep === 3 ? (
					<StepThreeMentorOnboarding />
				) : currentStep === 4 ? (
					<StepFourMentorOnboarding />
				) : currentStep === 5 ? (
					<FinalMentorOnboardingStep />
				) : (
					<StepOneMentorOnboarding />
				)}
				<div className="my-6 flex justify-between items-center w-full">
					{loading ? (
						<ActivityIndicator color="#094B10" className="mt-3" size={30} />
					) : currentStep > 1 && currentStep >= totalSteps ? (
						<></>
					) : (
						<div className="my-6 flex gap-5 items-center">
							{currentStep > 1 && (
								<div className="flex justify-start items-center">
									<PrimaryButton
										title={"Prev"}
										onClick={() => handlePrev()}
										className="px-8 p-2 flex justify-center"
									/>
								</div>
							)}
							<div className="flex justify-start items-center">
								<PrimaryButton
									title={loading ? "" : "Next"}
									icon={loading ? <ActivityIndicator /> : null}
									onClick={() => handleNext()}
									className="px-8 p-2 flex justify-center"
									disabled={loading}
								/>
							</div>
						</div>
					)}

					{currentStep > 1 && currentStep <= totalSteps - 1 && (
						<span onClick={() => moveToNextStep()} className="text-[#B1B1B1] cursor-pointer select-none">
							Skip{">>>"}
						</span>
					)}
				</div>
			</div>
			<div className="pb-10 md:pb-0 md:flex hidden sticky top-24 h-full">
				<MentorOnboardingSvg width={400} height={350} className="animate__animated animate__fadeInRight" />
			</div>
		</div>
	);
};

export default MentorOnboardingSteps;
