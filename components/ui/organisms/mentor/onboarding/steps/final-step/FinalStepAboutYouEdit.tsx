import React, { ChangeEvent, useRef, useState } from "react";
import CustomTextArea from "../../../../../atom/inputs/CustomTextArea";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { FinalStepEditButton } from "./index";
import {
	onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { MENTOR_ROLES } from "../../../../../../../constants/mentor";
import useSuggestions from "../../../../../../../hooks/input/useSuggestions";

const FinalStepAboutYouEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const bioInputRef = useRef<HTMLTextAreaElement>(null);
	const jobTitleInputRef = useRef<HTMLInputElement>(null);
	const mentorRolesArray = Object.values(MENTOR_ROLES);

	const [role, setRole] = useState<MENTOR_ROLES | undefined>(onboardingMentor.role || undefined);
	const { SuggestionsComponent, setSelectedSuggestions, selectedSuggestions } = useSuggestions<MENTOR_ROLES>({
		suggestions: mentorRolesArray,
		inputValue: role,
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRole(e.target.value as MENTOR_ROLES);
	};

	return (
		<>
			<div className="">
				<FinalStepEditButton
					title="what best describe you"
					editAction={() => {
						if (jobTitleInputRef.current) jobTitleInputRef.current.focus();
					}}
				/>
				<div className="relative flex flex-col justify-start text-sm items-center font-[300]">
					<CustomTextInput
						ref={jobTitleInputRef}
						inputMode="text"
						onChange={handleChange}
						value={role?.split("_").join(" ")}
						type="text"
						name="job_title"
						id="job_title"
						className="bg-transparent px-0"
						containerProps={{
							className: "bg-transparent border-transparent w-full",
						}}
						autoCorrect="none"
						autoCapitalize="none"
						autoComplete="none"
					/>
					<div className="absolute top-10 left-0 w-full">
						<SuggestionsComponent
							onSuggestionClick={(r) => {
								setRole(r);
								dispatch(
									setOnboardingMentor({
										...onboardingMentor,
										role: r,
									}),
								);
							}}
						/>
					</div>
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
						autoCorrect="none"
						autoCapitalize="none"
						autoComplete="none"
						ref={bioInputRef}
						value={onboardingMentor.bio}
						className="resize-none h-[160px] bg-transparent px-0"
						containerProps={{
							className: "bg-transparent border-transparent w-full",
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
