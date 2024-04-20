import React from "react";
import { FinalStepEditButton } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { onboardingMentorState, setOnboardingMentor } from "../../../../../../../redux/reducers/onboardingSlice";

const FinalStepAvailabilityEdit = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	return (
		<div className="my-2">
			<FinalStepEditButton
				title="Your Availability"
				editAction={() =>
					dispatch(
						setOnboardingMentor({ ...onboardingMentor, currentStep: onboardingMentor.currentStep - 1 }),
					)
				}
			/>

			{onboardingMentor.availability.length > 0 && (
				<div className="bg-white border border-[#70C5A1] flex flex-col w-full gap-5 p-4 mt-3 max-w-xl">
					{onboardingMentor.availability
						.filter((slot) => slot.isAvailable && slot.timeSlots.length >= 1)
						.map(({ day, timeSlots }, index) => {
							// day &&
							return (
								<div className="flex flex-col items-start text-sm tracking-tight" key={index}>
									<h1 className="basis-3/5 capitalize">{day}</h1>
									<div className="mt-1.5 w-full gap-1 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 animate__animated animate__fadeIn animate__faster">
										{timeSlots.map(({ endTime, startTime }, index) => {
											return (
												<div
													key={index}
													className="bg-[#00D569] text-[white] border p-1.5 px-2 w-full flex items-center justify-center gap-3">
													<div className="flex items-center gap-2 px-1">
														<span className="">{startTime}</span>
														<span>-</span>
														<span className="">{endTime}</span>
														{/* .split(":").join(" : ") */}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default FinalStepAvailabilityEdit;
