import React, { useEffect, useState } from "react";
import StepOneMentorOnboarding from "./step-one";
import MentorOnboardingStepsHeader from "../../../../atom/cards/mentor/MentorOnboardingStepsHeader";
import { MentorOnboardingSvg } from "../../../../atom/icons/svgs";
import { PrimaryButton } from "../../../../atom/buttons";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import StepTwoMentorOnboarding from "./step-two";
import { scrollToTop } from "../../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../redux/reducers/features/onboardingSlice";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { currentUser } from "../../../../../../redux/reducers/features/authSlice";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../constants";

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
						currentStep,
					}),
				);
				setCurrentStep((prev) => prev + 1);
				scrollToTop();
			}
			setLoading(false);
		}, 1500);
	};
	const handleNext = () => {
		setLoading(true);
		if (onboardingMentor && currentStep < totalSteps) {
			if (currentStep === 1) {
				if (onboardingMentor.bio && onboardingMentor.jobTitle) {
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
			if (currentStep === 2) {
				if (
					onboardingMentor.skills &&
					onboardingMentor.yearsOfExp &&
					onboardingMentor.workHistory &&
					onboardingMentor.projects
				) {
					if (onboardingMentor.workHistory?.length < 1) {
						toast.error(
							"Add at least one work experience",
							ToastDefaultOptions({ id: "error", theme: "dark" }),
						);
						setLoading(false);
						return;
					}
					// if (check typeof project link)
					moveToNextStep();
				} else {
					setLoading(false);
				}
			}
			if (currentStep === 3) {
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
	const handlePrev = () => {
		setLoading(false);
		scrollToTop();
		if (onboardingMentor)
			if (currentStep > 1) setCurrentStep((prev) => (prev -= 1));
	};

	return (
		<div className="flex h-full flex-col md:flex-row justify-between items-start sm:max-w-[85dvw] 2xl:max-w-[65dvw] mx-5 sm:mx-auto md:py-[10dvh] pb-20 min-h-screen">
			<div className="w-full md:max-w-lg">
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
				<div className="my-6 flex justify-between items-center w-full">
					{currentStep > 1 && (
						<div className="flex justify-start items-center">
							<PrimaryButton
								title={"Prev"}
								// icon={loading ? <ActivityIndicator /> : null}
								onClick={() => handlePrev()}
								className="px-8 p-2 flex justify-center"
								// disabled={loading}
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
