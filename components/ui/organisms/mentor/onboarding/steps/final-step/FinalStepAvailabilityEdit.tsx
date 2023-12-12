import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";
import Availability from "../step-four/Availability";

const FinalStepAvailabilityEdit = () => {
	const [editAvailability, setEditAvailability] = useState<boolean>(false);
	const onboardingMentor = useSelector(onboardingMentorState);
	return (
		<div className="my-2">
			<FinalStepEditButton title="Your Availability" editAction={() => setEditAvailability(!editAvailability)} />
			{editAvailability ? (
				<Availability />
			) : (
				<>
					<div className="bg-white border border-[#70C5A1] flex flex-col w-full gap-5 p-4 mt-3 max-w-xl">
						{onboardingMentor.availability.map((schedule, index) => {
							return (
								schedule.day && (
									<div
										className="flex justify-between items-center text-sm tracking-tight"
										key={index}>
										<h1 className="basis-3/5">{schedule.day}</h1>
										<span className="flex-grow">
											{schedule.timeSlots[0].startTime} - {schedule.timeSlots[0].endTime}
										</span>
									</div>
								)
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default FinalStepAvailabilityEdit;
