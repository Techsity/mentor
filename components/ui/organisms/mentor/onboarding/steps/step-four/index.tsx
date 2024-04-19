import React, { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onboardingMentorState, setOnboardingMentor } from "../../../../../../../redux/reducers/onboardingSlice";
import Languages from "./Languages";
import classNames from "classnames";
import { Checkmark, Close } from "react-ionicons";
import TimePicker, { ICurrentTime } from "../../../../../atom/common/TimePicker";
import { MentorOnboardingTimeSlot } from "../../../../../../../interfaces/mentor.interface";

const initialState: MentorOnboardingTimeSlot["timeSlots"][0] = {
	endTime: "00:00",
	startTime: "00:00",
};

const StepFourMentorOnboarding = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const dispatch = useDispatch();
	const availability = useMemo(() => onboardingMentor.availability, [onboardingMentor.availability]);
	const [currentIndex, setCurrentIndex] = useState<{ index?: number; slotIndex?: number }>({
		index: 0,
		slotIndex: 0,
	});

	const [currentTimerOpen, setCurrentTimerOpen] = useState<"start" | "end" | false>(false);

	const toggleAvailability = (index: number) => {
		let arr = [...availability];
		if (index !== -1) {
			arr[index] = { ...arr[index], isAvailable: !arr[index].isAvailable };
			dispatch(setOnboardingMentor({ ...onboardingMentor, availability: arr }));
		}
	};

	const addNewTimeSlot = (index: number) => {
		let updated = [...availability];
		if (index >= 0) {
			updated[index] = { ...updated[index], timeSlots: [...updated[index].timeSlots, initialState] };
			dispatch(setOnboardingMentor({ ...onboardingMentor, availability: updated }));
			setCurrentIndex({
				index,
				slotIndex: updated[index].timeSlots.length,
			});
			setCurrentTimerOpen("start");
		}
	};

	const handleCloseTimePicker = () => {
		if (currentIndex?.index !== undefined && currentIndex.slotIndex !== undefined)
			handleDeleteTimeSlot(currentIndex.index, currentIndex.slotIndex - 1);
		setCurrentTimerOpen(false);
	};

	const updateTimeSlot = (input: ICurrentTime) => {
		const { meridan } = input;
		let updated = [...availability];
		const updateIndex = currentIndex.index;
		const slotIndex = Number(currentIndex.slotIndex) - 1;
		if (updateIndex !== undefined && updateIndex !== -1)
			if (slotIndex !== undefined && slotIndex !== -1) {
				let timeToUpdate = updated[updateIndex].timeSlots[slotIndex];
				input.min =
					meridan === "am" && input.min == "12"
						? "00"
						: meridan === "am"
						? String(input.min).padStart(2, "0")
						: parseInt(input.min) + 12 === 24
						? "12"
						: String(parseInt(input.min) + 12);
				if (currentTimerOpen === "start") {
					timeToUpdate = { startTime: `${input.min}:${input.secs}`, endTime: timeToUpdate.endTime };
					setCurrentTimerOpen(false);
					setTimeout(() => {
						setCurrentTimerOpen("end");
					}, 50);
				} else if (currentTimerOpen === "end") {
					timeToUpdate = { startTime: timeToUpdate.startTime, endTime: `${input.min}:${input.secs}` };
					setCurrentTimerOpen(false);
				}
				updated[updateIndex] = {
					...updated[updateIndex],
					timeSlots: [
						...updated[updateIndex].timeSlots.filter((slot, i) => i !== slotIndex),
						{ ...timeToUpdate },
					],
				};
				dispatch(setOnboardingMentor({ ...onboardingMentor, availability: updated }));
			}
	};

	const handleDeleteTimeSlot = (index: number, slotIndex: number) => {
		let updatedAvailability = [...availability];
		if (index >= 0 && slotIndex >= 0) {
			updatedAvailability[index] = {
				...updatedAvailability[index],
				timeSlots: updatedAvailability[index].timeSlots.filter((slot, i) => i !== slotIndex),
			};
			dispatch(setOnboardingMentor({ ...onboardingMentor, availability: updatedAvailability }));
		}
	};

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
											handleToggle: () => toggleAvailability(i),
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
			{currentTimerOpen !== false && (
				<div className="fixed top-0 left-0 flex items-center justify-center h-full w-full z-40 px-6 sm:px-0">
					<div className="absolute bg-black/50 backdrop-blur-sm w-full h-full top-0 left-0" />
					<div className="max-h-md max-w-md mx-auto relative z-50">
						<TimePicker
							capitalizeTitle
							title={currentTimerOpen.concat(" time")}
							className="animate__animated animate__fadeIn animate__faster"
							initialState={{ meridan: "am", min: "00", secs: "00" }}
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

export default memo(StepFourMentorOnboarding);
// && and sign
