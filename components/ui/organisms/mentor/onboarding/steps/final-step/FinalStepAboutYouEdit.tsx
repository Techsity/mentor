import React, { useRef } from "react";
import CustomTextArea from "../../../../../atom/inputs/CustomTextArea";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { FinalStepEditButton } from "./index";
import {
	onboardingMentor as onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";

const FinalStepAboutYouEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const bioInputRef = useRef<HTMLTextAreaElement>(null);
	const jobTitleInputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<div className="">
				<FinalStepEditButton
					title="what best describe you"
					editAction={() => {
						if (jobTitleInputRef.current)
							jobTitleInputRef.current.focus();
					}}
				/>
				<div className="flex justify-start text-sm items-center font-[300]">
					<CustomTextInput
						inputMode="text"
						type="text"
						ref={jobTitleInputRef}
						value={onboardingMentor.jobTitle}
						// readOnly={true}
						className="bg-transparent px-0"
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

			<div className="grid gap-2">
				<FinalStepEditButton
					title="About you"
					editAction={() => {
						if (bioInputRef.current) bioInputRef.current.focus();
					}}
				/>
				<div className="flex justify-start text-sm items-center font-[300]">
					<CustomTextArea
						inputMode="text"
						ref={bioInputRef}
						value={onboardingMentor.bio}
						className="resize-none h-[160px] bg-transparent px-0"
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
		</>
	);
};

export default FinalStepAboutYouEdit;
