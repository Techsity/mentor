import React, {
	ChangeEvent,
	Dispatch,
	MouseEvent,
	SetStateAction,
	useState,
} from "react";
import CustomTextInput from "../../../../atom/inputs/CustomTextInput";
import CustomTextArea from "../../../../atom/inputs/CustomTextArea";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { PrimaryButton } from "../../../../atom/buttons";
import TagsInput from "../../../../atom/inputs/TagsInput";

// const StepTwoMentorOnboarding = (formState) => {
const StepTwoMentorOnboarding = ({
	setState,
	formState,
}: {
	formState: IMentorOnboardingState;
	setState: Dispatch<SetStateAction<IMentorOnboardingState>>;
}) => {
	const addSkill = (skill: string) => {
		if (skill && formState.skills.length < 5) {
			setState((prevState) => {
				if (prevState.skills.includes(skill)) {
					return prevState;
				} else {
					return {
						...prevState,
						skills: [...prevState.skills, skill],
					};
				}
			});
		}
	};
	const removeSkill = (skillToRemove: string) => (e: MouseEvent) => {
		if (skillToRemove) {
			setState((prevState) => ({
				...prevState,
				skills: prevState.skills.filter(
					(skill) => skill !== skillToRemove,
				),
			}));
		}
	};
	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				Now tell us your experience
			</h1>
			<p className="text-sm text-black">
				First, what are your top skills, how many years of experience do
				you have, then where have you worked, what project have you
				completed?
			</p>
			<div className="grid gap-5 mt-8">
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">
						What are your top Skills? (Up to 5)
					</h1>
					<TagsInput
						addTag={addSkill}
						onRemove={removeSkill}
						tagsState={formState.skills}
					/>
				</div>
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">
						How many years of experience?
					</h1>
					<CustomTextInput
						type="number"
						// maxLength={40}
						// max={40}
						onChange={(e) =>
							setState({
								...formState,
								jobTitle: e.target.value,
							})
						}
						value={formState.jobTitle}
						className="bg-white"
						containerProps={{
							className:
								"border border-[#00D569] appearance-none",
						}}
					/>
				</div>
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">
						How would you describe Yourself?
					</h1>
					<CustomTextArea
						onChange={(e) =>
							setState({ ...formState, bio: e.target.value })
						}
						value={formState.bio}
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

export default StepTwoMentorOnboarding;
