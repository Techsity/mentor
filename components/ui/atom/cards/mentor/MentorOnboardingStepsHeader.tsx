import React from "react";

const MentorOnboardingStepsHeader = (props: {
	stepsLength?: number;
	currentStep: number;
}) => {
	const { stepsLength = 4, currentStep } = props;
	const stepNumbers = Array.from(
		{ length: stepsLength },
		(_, index) => index + 1,
	);
	return (
		<ul className="relative flex w-full justify-between mb-6 py-6 items-start gap-8 sticky md:static z-10 top-20 h-full bg-[#F6F9F8] backdrop-blur-md">
			{stepNumbers.map((step, id) => (
				<li
					className="relative w-full flex justify-start items-center animate__animated animate__bounceIn animate-slower"
					key={id}>
					{step < stepsLength ? (
						<div
							className={`absolute top-[45%] -z-10 h-1 w-[180%] bg-[#70C5A1] ${
								currentStep >= step
									? "bg-[#70C5A1]"
									: "bg-zinc-200"
							}`}
						/>
					) : null}
					<div
						className={`h-10 h-9 sm:h-16 sm:w-16 p-3.5 sm:p-5 items-center flex justify-center rounded-full ${
							currentStep >= step
								? "text-white bg-[#70C5A1]"
								: "text-black bg-zinc-200"
						}`}> 
						{step}
					</div>
				</li>
			))}
		</ul>
	);
};

export default MentorOnboardingStepsHeader;
