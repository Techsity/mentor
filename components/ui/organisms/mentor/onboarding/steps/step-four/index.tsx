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
import { IMentorAvailability, TimeSlot } from "../../../../../../../interfaces/mentor.interface";
import { slugify } from "../../../../../../../utils";
import classNames from "classnames";
import { Checkmark, Close } from "react-ionicons";

// type TimeSlotSubSet = { day: string; timeSlot: Omit<TimeSlot, "isOpen">; isAvailable: boolean };
interface TimeSlotSubSet extends Omit<IMentorAvailability, "id" | "timeSlots"> {
	isAvailable: boolean;
	timeSlots: Omit<TimeSlot, "isOpen">[];
}

const StepFourMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const { openModal } = useModal();
	const [availability, setAvailability] = useState<TimeSlotSubSet[]>(
		daysOfTheWeek.map((day) => {
			return { day, isAvailable: false, timeSlots: [] };
		}),
	);

	const updateTimeSlot = (day: string, input: Partial<Omit<TimeSlotSubSet, "day">>) => {
		const { isAvailable } = input;
		setAvailability((p) => {
			let updated = [...p];
			const updateIndex = updated.findIndex((slot) => slot.day === day);
			if (updateIndex !== -1) {
				const slot = updated[updateIndex];
				updated[updateIndex] = { ...slot, ...input };
			}
			return updated;
		});
	};

	useEffect(() => {
		dispatch(setOnboardingMentor({ ...onboardingMentor, availability: [] }));
	}, [availability]);

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
				{availability.map(({ day, isAvailable, timeSlots }, i) => {
					return (
						<div
							key={i}
							className="text-sm flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 items-start bg-white border border-[#00D569] p-3">
							<ToggleSwitch
								animated
								{...{
									isActive: isAvailable,
									handleToggle: () => updateTimeSlot(day, { isAvailable: !isAvailable }),
								}}
							/>
							<div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-4 gap-2 flex-grow h-full lg:w-auto md:w-full sm:w-auto w-full">
								<div
									className={classNames(
										"font-medium duration-300",
										!isAvailable ? "text-[#bbb] col-span-4" : "col-span-1",
									)}>
									<h1 className="capitalize">
										{day} {!isAvailable && <span className="text-xs"> - Unavailable</span>}
									</h1>
								</div>
								{isAvailable && (
									<div className="w-full col-span-3 flex items-center gap-5">
										{isAvailable && (
											<div className="text-[#70C5A1] lg:block md:hidden sm:block hidden">|</div>
										)}
										{timeSlots.length < 1 ? (
											<div className="text-[#70C5A1] cursor-pointer select-none">
												+Create time slots
											</div>
										) : (
											<>
												<h1 className="capitalize font-medium">Time slots</h1>
												<div className="mt-1.5 w-full gap-2 grid grid-cols-2 md:grid-cols-3 xs:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 animate__animated animate__fadeIn animate__faster">
													{timeSlots.map(({ endTime, startTime }, index) => {
														return (
															<>
																<div key={index} className="flex items-center gap-1">
																	<span className="">{endTime}</span>
																	<span>-</span>
																	<span className="">{startTime}</span>
																</div>
															</>
														);
													})}
													<div className="text-[#70C5A1] cursor-pointer select-none">
														+Add more
													</div>
												</div>
											</>
										)}
									</div>
								)}
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
	className,
	animated,
}: {
	isActive: boolean;
	handleToggle: () => void;
	animated?: boolean;
	className?: string;
}) => {
	return (
		<div
			onClick={handleToggle}
			className={classNames(
				"cursor-pointer flex gap-3 sm:h-[20px] md:h-8 h-8 lg:h-[20px] w-10 items-center justify-center rounded-full relative overflow-hidden",
				animated ? "duration-300" : "",
				isActive ? "bg-[#70C5A1]" : "bg-[#bbb]",
				className,
			)}>
			{isActive ? (
				<div className="flex justify-center absolute h-full right-0 items-center p-[3px] rounded-full bg-white animate__animated animate__fadeInLeft animate__fastest">
					<Checkmark color="#00D569" width={"15px"} height={"15px"} />
				</div>
			) : (
				<div className="flex justify-center absolute h-full left-0 items-center p-[3px] rounded-full bg-white animate__animated animate__fadeInLeft animate__fastest">
					<Close color="#00D569" width={"15px"} height={"15px"} />
				</div>
			)}
		</div>
	);
};

export default StepFourMentorOnboarding;
// && and sign
