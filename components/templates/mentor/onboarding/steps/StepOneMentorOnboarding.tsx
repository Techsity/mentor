import React from "react";
import { PrimaryButton } from "../../../../ui/atom/buttons";

const StepOneMentorOnboarding = ({ nextStep }: { nextStep: any }) => {
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
			<div className="my-6">
				<div className="flex justify-start items-center">
					<PrimaryButton
						title="Next"
						onClick={nextStep}
						className="px-8 p-2 flex justify-center"
					/>
				</div>
			</div>
		</div>
	);
};

export default StepOneMentorOnboarding;
