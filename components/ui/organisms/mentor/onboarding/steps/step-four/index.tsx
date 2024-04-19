import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setOnboardingMentor, onboardingMentorState } from "../../../../../../../redux/reducers/onboardingSlice";
import { daysOfTheWeek } from "../../../../../../../constants";
import Languages from "./Languages";
import { IMentorAvailability, TimeSlot } from "../../../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { Checkmark, Close } from "react-ionicons";
import TimePicker, { ICurrentTime } from "../../../../../atom/common/TimePicker";

// type TimeSlotSubSet = { day: string; timeSlot: Omit<TimeSlot, "isOpen">; isAvailable: boolean };
interface TimeSlotSubSet extends Omit<IMentorAvailability, "id" | "timeSlots"> {
	isAvailable: boolean;
	timeSlots: Omit<TimeSlot, "isOpen">[];
}

const StepFourMentorOnboarding = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const [availability, setAvailability] = useState<TimeSlotSubSet[]>(
		daysOfTheWeek.map((day) => {
			return { day, isAvailable: false, timeSlots: [] };
		}),
	);
	const [currentIndex, setCurrentIndex] = useState<{ index?: number; slotIdx?: number }>({ index: 0, slotIdx: 0 });
	const [currentTimerOpen, setCurrentTimerOpen] = useState<"start" | "end" | null>(null);
	const timepickerRef = useRef<HTMLDivElement>(null);

	const updateAvailability = (day: string, input: Partial<Omit<TimeSlotSubSet, "day">>) => {
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

	const addNewTimeSlot = (i: number) => {
		setAvailability((p) => {
			let updated = [...p];
			const updateIndex = i;
			if (updateIndex !== undefined && updateIndex !== -1) {
				updated[updateIndex].timeSlots.push({
					endTime: "00:00",
					startTime: "00:00",
				});
				setCurrentIndex({
					index: i,
					slotIdx: updated[updateIndex].timeSlots.length,
				});
			}
			return updated;
		});
		setCurrentTimerOpen("start");
	};

	const handleDeleteTimeSlot = (index: number, slotIndex: number) => {
		const updatedAvailability = [...availability];
		if (index >= 0 && index < updatedAvailability.length) {
			updatedAvailability[index].timeSlots.splice(slotIndex, 1);
			setAvailability(updatedAvailability);
		}
	};

	const updateTimeSlot = (input: ICurrentTime) => {
		const { meridan } = input;
		setAvailability((p) => {
			let updated = [...p];
			const updateIndex = currentIndex.index;
			const slotIndex = Number(currentIndex.slotIdx) - 1;
			if (updateIndex !== undefined && updateIndex !== -1)
				if (slotIndex !== undefined && slotIndex !== -1) {
					let timeToUpdate = updated[updateIndex].timeSlots[slotIndex];
					// input.min =
					// 	meridan === "am" ? String(input.min).padStart(2, "0") : String(parseInt(input.min) + 12);
					if (currentTimerOpen === "start") {
						timeToUpdate = { startTime: `${input.min}:${input.secs}`, endTime: timeToUpdate.endTime };
						setCurrentTimerOpen(null);
						const t = setTimeout(function () {
							setCurrentTimerOpen("end");
							clearTimeout(t);
						}, 50);
					} else if (currentTimerOpen === "end") {
						timeToUpdate = { startTime: timeToUpdate.startTime, endTime: `${input.min}:${input.secs}` };
						setCurrentTimerOpen(null);
					}
					updated[updateIndex].timeSlots[slotIndex] = timeToUpdate;
				}
			return updated;
		});
	};

	const handleCloseTimePicker = () => {
		if (currentIndex?.index !== undefined && currentIndex.slotIdx !== undefined)
			handleDeleteTimeSlot(currentIndex.index, currentIndex.slotIdx - 1);
		setCurrentTimerOpen(null);
	};

	// useEffect(() => {
	// 	dispatch(setOnboardingMentor({ ...onboardingMentor, availability: [] }));
	// }, [availability]);

	return (
		<>
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
							<div key={i} className="text-sm bg-white border border-[#00D569] p-3">
								<div className="flex gap-4 items-center">
									<ToggleSwitch
										animated
										{...{
											isActive: isAvailable,
											handleToggle: () => updateAvailability(day, { isAvailable: !isAvailable }),
										}}
									/>
									<div className="flex items-center justify-between gap-2 flex-grow h-full lg:w-auto md:w-full sm:w-auto w-full">
										<div
											className={classNames(
												"font-medium duration-300",
												!isAvailable ? "text-[#bbb]" : "text-[16px]",
											)}>
											<h1 className="capitalize">
												{day} {!isAvailable && <span className="text-xs"> - Unavailable</span>}
											</h1>
										</div>
										{isAvailable && (
											<div className="text-[#70C5A1]">
												<div
													onClick={() => addNewTimeSlot(i)}
													className="text-[#00D569] cursor-pointer select-none">
													+Add {timeSlots.length < 1 ? "a" : "new"} time slot
												</div>
											</div>
										)}
									</div>
								</div>
								{isAvailable && timeSlots.length >= 1 && (
									<div className="mt-4 px-1">
										<h1 className="capitalize font-medium">Time slots</h1>
										<div className="mt-1.5 w-full gap-2 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 animate__animated animate__fadeIn animate__faster">
											{timeSlots.map(({ endTime, startTime }, index) => {
												return (
													<div
														key={index}
														className="bg-[#00D569] text-[white] border p-1.5 px-2 w-full flex items-center justify-center gap-3">
														<span
															onClick={() => handleDeleteTimeSlot(i, index)}
															className="text-[20px] text-[#fff] select-none cursor-pointer">
															&times;
														</span>
														<div className="flex items-center gap-1 px-1">
															<span className="">{startTime}</span>
															<span>-</span>
															<span className="">{endTime}</span>
														</div>
														{/* <div
															onClick={() => {
																setCurrentTimerOpen("start");
																setCurrentIndex({ index: i, slotIdx: index });
															}}
															className="text-[#70C5A1] cursor-pointer select-none text-sm">
															{parseInt(endTime) == 0 && parseInt(startTime) == 0
																? "Set"
																: "Update"}
														</div> */}
													</div>
												);
											})}
										</div>
									</div>
								)}
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
			{currentTimerOpen !== null && (
				<div className="fixed top-0 left-0 flex items-center justify-center h-full w-full z-40 px-6 sm:px-0">
					<div className="absolute bg-black/50 backdrop-blur-sm w-full h-full top-0 left-0" />
					<div className="max-h-md max-w-md mx-auto relative z-50">
						<TimePicker
							capitalizeTitle
							title={currentTimerOpen.concat(" time")}
							className="animate__animated animate__fadeIn animate__faster"
							// initialState={(() => {
							// 	const currentId = currentIndex.index;
							// 	const slotIndex = currentIndex.index;
							// 	if (currentId !== undefined && slotIndex !== undefined) {
							// 		const state = availability[currentId].timeSlots[slotIndex];
							// 		if (state !== undefined) {
							// 			console.log({ state });
							// 			const min = state.startTime.split(":")[0];
							// 			const secs = state.endTime.split(":")[1];
							// 			const min24H = parseInt(min) + 12;
							// 			console.log({ min24H });
							// 			const meridan: ICurrentTime["meridan"] =
							// 				min24H === 24 ? "am" : parseInt(min) >= 12 ? "pm" : "am";
							// 			console.log({ min: parseInt(min) });
							// 			return { min, secs, meridan };
							// 		}
							// 	}
							// })()}
							initialState={{ meridan: "am", min: "00", secs: "00" }}
							ref={timepickerRef}
							closeTimePicker={handleCloseTimePicker}
							onChange={updateTimeSlot}
						/>
					</div>
				</div>
			)}
		</>
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
				"cursor-pointer flex gap-3 h-[20px] w-10 items-center justify-center rounded-full relative overflow-hidden",
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
