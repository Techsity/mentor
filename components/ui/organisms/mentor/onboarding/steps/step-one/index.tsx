import React, { ChangeEvent, useState } from "react";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import CustomTextArea from "../../../../../atom/inputs/CustomTextArea";
import { useDispatch, useSelector } from "react-redux";
import {
	onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import useSuggestions from "../../../../../../../hooks/input/useSuggestions";
import mentorRoles from "../../../../../../../data/global/mentorRoles.json";

const StepOneMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const [role, setRole] = useState<string>(onboardingMentor?.role || "");

	const { SuggestionsComponent, setSelectedSuggestions, selectedSuggestions } = useSuggestions<string>({
		suggestions: mentorRoles.map((item) => item),
		inputValue: role,
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRole(e.target.value);
	};

	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				First tell us about yourself!
			</h1>
			<p className="text-sm text-black">Tell us what best describe you and write a little bio about yourself.</p>
			<div className="grid gap-5 mt-5">
				<div className="grid gap-2 relative">
					<h1 className="text-sm text-[#B1B1B1]">What do you do?</h1>
					<CustomTextInput
						onChange={handleChange}
						value={role}
						type="text"
						name="job_title"
						id="job_title"
						className="bg-white"
						containerProps={{
							className: "border border-[#00D569]",
						}}
					/>
					<div className="absolute top-20 left-0 w-full">
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
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">How would you describe Yourself?</h1>
					<CustomTextArea
						onChange={(e) =>
							dispatch(
								setOnboardingMentor({
									...onboardingMentor,
									bio: e.target.value,
								}),
							)
						}
						value={onboardingMentor.bio}
						className="bg-white"
						containerProps={{
							className: "border border-[#00D569]",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepOneMentorOnboarding;
