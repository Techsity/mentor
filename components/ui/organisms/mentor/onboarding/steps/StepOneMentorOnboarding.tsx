import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import CustomTextInput from "../../../../atom/inputs/CustomTextInput";
import CustomTextArea from "../../../../atom/inputs/CustomTextArea";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";

// const StepOneMentorOnboarding = (formState) => {
const StepOneMentorOnboarding = ({
	setState,
	formState,
}: {
	formState: IMentorOnboardingState;
	setState: Dispatch<SetStateAction<IMentorOnboardingState>>;
}) => {
	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				First tell us about yourself!
			</h1>
			<p className="text-sm text-black">
				Tell us what best describe you and write a little bio about
				yourself.
			</p>
			<div className="grid gap-5 mt-5">
				<div className="grid gap-2">
					<h1 className="text-sm text-[#B1B1B1]">What do you do?</h1>
					<CustomTextInput
						onChange={(e) =>
							setState({ ...formState, jobTitle: e.target.value })
						}
						value={formState.jobTitle}
						type="text"
						className="bg-white"
						containerProps={{
							className: "border border-[#00D569]",
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

export default StepOneMentorOnboarding;
