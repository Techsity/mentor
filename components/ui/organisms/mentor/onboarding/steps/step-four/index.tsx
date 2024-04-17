import React, { MouseEvent, useEffect, useState } from "react";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import TagsInput from "../../../../../atom/inputs/TagsInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setOnboardingMentor, onboardingMentorState } from "../../../../../../../redux/reducers/onboardingSlice";
import { toast } from "react-toastify";
import { daysOfTheWeek, ToastDefaultOptions } from "../../../../../../../constants";
import Availability from "./Availability";
import Languages from "./Languages";
import { useModal } from "../../../../../../../context/modal.context";
import { TimeSlot } from "../../../../../../../interfaces/mentor.interface";
import { slugify } from "../../../../../../../utils";
import classNames from "classnames";
import { Checkmark, Close } from "react-ionicons";

type TimeSlotSubSet = { day: string; timeSlot: Omit<TimeSlot, "isOpen">; isAvailable: boolean };

const StepFourMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const { openModal } = useModal();
	const [timeSlots, setTimeSlots] = useState<TimeSlotSubSet[]>(
		daysOfTheWeek.map((day) => {
			return { day, isAvailable: false, timeSlot: { endTime: "00:00", startTime: "00:00" } };
		}),
	);

	const updateTimeSlot = (day: string, input: Partial<Omit<TimeSlotSubSet, "day">>) => {
		const { isAvailable, timeSlot } = input;
		const { endTime, startTime } = timeSlot || {};
		setTimeSlots((p) => {
			let updated = [...p];
			const updateIndex = updated.findIndex((slot) => slot.day === day);
			if (updateIndex !== -1) {
				const slot = updated[updateIndex];
				updated[updateIndex] = { ...slot, ...input };
			}
			return updated;
		});
	};

	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft -mt-5"
				style={{ fontFamily: "Days One" }}>
				Finally, What is your availability like?
			</h1>
			<p className="text-sm text-black">
				Create the dates and time you would be available for mentorship sessions.
			</p>
			<div className="grid gap-5 mt-8">
				{timeSlots.map(({ day, isAvailable }, i) => {
					return (
						<div
							key={i}
							className="text-sm xs:flex sm:block lg:flex gap-4 items-center bg-white border border-[#00D569] p-3">
							<ToggleSwitch
								{...{
									isActive: isAvailable,
									handleToggle: () => updateTimeSlot(day, { isAvailable: !isAvailable }),
								}}
							/>
							<div className={classNames("font-medium duration-300", !isAvailable ? "text-[#bbb]" : "")}>
								<h1 className="capitalize">
									{day} {!isAvailable && <span className="text-xs"> - Unavailable</span>}
								</h1>
							</div>
						</div>
					);
				})}
				{/*  */}
				<br />
				<p className="text-sm text-black">
					As a bonus tip about you, Tell us The language you&apos;re fluent at. (We added this so that a
					mentee can reach you easily in their preferred language).
				</p>
				<Languages />
			</div>
		</div>
	);
};

const ToggleSwitch = ({
	handleToggle,
	isActive,
}: {
	isActive: boolean;
	handleToggle: () => void;
	animated?: boolean;
}) => {
	return (
		<div
			onClick={handleToggle}
			className={classNames(
				"cursor-pointer flex gap-3 h-full w-10 items-center rounded-full relative duration-300 overflow-hidden",
				isActive ? "bg-[#00D569]" : "bg-[#bbb]",
			)}>
			{isActive ? (
				<div className="flex justify-center absolute right-0 items-center p-[3px] rounded-full animate__animated animate__fadeInLeft animate__fastest bg-white">
					<Checkmark color="#555" width={"15px"} height={"15px"} />
				</div>
			) : (
				<div className="flex justify-center absolute left-0 items-center p-[3px] rounded-full animate__animated animate__fadeInRight animate__fastest bg-white">
					<Close color="#555" width={"15px"} height={"15px"} />
				</div>
			)}
		</div>
	);
};

export default StepFourMentorOnboarding;
// && and sign
