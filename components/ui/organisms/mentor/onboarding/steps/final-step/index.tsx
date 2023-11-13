import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch } from "react-redux";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import CustomTextArea from "../../../../../atom/inputs/CustomTextArea";

const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	const bioInputRef = useRef<HTMLTextAreaElement>(null);
	const jobTitleInputRef = useRef<HTMLInputElement>(null);
	const StepEdit = ({
		step,
		title,
		editAction,
	}: {
		title: string;
		step?: number;
		editAction?: any;
	}) => (
		<div className="flex justify-between text-sm items-center font-[300]">
			<p className="text-[#A3A6A7]">{title}</p>
			<p
				className="text-[#70C5A1] select-none cursor-pointer"
				onClick={() => {
					if (step)
						dispatch(
							setOnboardingMentor({
								...onboardingMentor,
								currentStep: step,
							}),
						);
					if (editAction) editAction();
				}}>
				Edit
			</p>
		</div>
	);
	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Weldone, You are all set!
			</h1>
			<p className="text-sm text-black mb-5">
				Just so you know, here are the informations you provided. You
				can edit them if there are any errors.
			</p>
			<div className="grid gap-3">
				<div className="grid gap-2">
					<StepEdit
						title="what best describe you"
						editAction={() => {
							if (jobTitleInputRef.current)
								jobTitleInputRef.current.focus();
						}}
					/>
					<div className="flex justify-start text-sm items-center font-[300]">
						<CustomTextInput
							inputMode="text"
							typeof="text"
							ref={jobTitleInputRef}
							value={onboardingMentor.jobTitle}
							className="bg-transparent"
							containerProps={{
								className:
									"bg-transparent border-transparent w-full",
							}}
							onChange={(e) =>
								dispatch(
									setOnboardingMentor({
										...onboardingMentor,
										jobTitle: e.target.value,
									}),
								)
							}
						/>
					</div>
				</div>
				<div className="grid gap-3">
					<StepEdit
						title="About you"
						editAction={() => {
							if (bioInputRef.current)
								bioInputRef.current.focus();
						}}
					/>
					<div className="flex justify-start text-sm items-center font-[300]">
						<CustomTextArea
							inputMode="text"
							ref={bioInputRef}
							value={onboardingMentor.bio}
							className="resize-none h-[160px] bg-transparent"
							containerProps={{
								className:
									"bg-transparent border-transparent w-full",
							}}
							onChange={(e) =>
								dispatch(
									setOnboardingMentor({
										...onboardingMentor,
										bio: e.target.value,
									}),
								)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinalMentorOnboardingStep;
