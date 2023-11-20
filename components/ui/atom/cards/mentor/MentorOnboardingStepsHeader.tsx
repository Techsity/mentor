import React from "react";

const MentorOnboardingStepsHeader = (props: {
	stepsLength?: number;
	currentStep: number;
}) => {
	const { stepsLength = 4, currentStep } = props;
	const stepNumbers = Array.from(
		{ length: stepsLength - 1 },
		(_, index) => index + 1,
	);
	return (
		<div className="relative grid grid-cols-4 w-full justify-between mb-6 py-6 items-center sticky z-10 top-20 h-full bg-[#F6F9F85A] backdrop-blur-sm">
			{stepNumbers.map((step, id) => (
				<div
					key={id}
					className="relative w-full flex justify-start items-center">
					<div
						className={`h-10 z-10 h-9 sm:h-16 sm:w-16 p-3.5 sm:p-5 items-center flex justify-center rounded-full ${
							currentStep >= step
								? "text-white bg-[#70C5A1] md:animate__animated animate__bounceIn animate__slow"
								: "text-black bg-zinc-200"
						}`}>
						{step}
					</div>
					{step < stepsLength - 1 && (
						<div className="absolute h-1 w-full bg-zinc-200" />
					)}
					{step < stepsLength - 1 ? (
						<div
							className={`absolute h-1 ${
								currentStep === step
									? "bg-[#70C5A1] w-[75%]"
									: currentStep > step
									? "bg-[#70C5A1] w-full"
									: ""
							}`}
						/>
					) : null}
				</div>
			))}
		</div>
	);
};

export default MentorOnboardingStepsHeader;
