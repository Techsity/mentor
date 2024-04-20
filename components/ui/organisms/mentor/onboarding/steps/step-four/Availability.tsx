import React, { useEffect, useMemo, useRef, useState } from "react";
import { setOnboardingMentor, onboardingMentorState } from "../../../../../../../redux/reducers/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import TimePicker, { ICurrentTime } from "../../../../../atom/common/TimePicker";
import { IMentorAvailability, TimeSlot } from "../../../../../../../interfaces/mentor.interface";
import { daysOfTheWeek } from "../../../../../../../constants";

const Availability = () => {
	const days = daysOfTheWeek;
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initialSchedule: IMentorAvailability = {
		day: "",
		timeSlots: [],
	};
	const [schedule, setSchedule] = useState<IMentorAvailability>(initialSchedule);
	const [startTimeIsOpen, setStartTimeIsOpen] = useState<React.Key | false>(false);
	const [endTimeIsOpen, setEndTimeIsOpen] = useState<React.Key | false>(false);
	const timepickerRef = useRef<HTMLDivElement>(null);

	const closeTimePicker = () => {
		setStartTimeIsOpen(false);
		setEndTimeIsOpen(false);
	};
	const openTimePicker = (args: { field: "end" | "start"; id: React.Key }) => {
		const { field, id } = args;
		if (field === "end") {
			if (endTimeIsOpen === id) {
				setEndTimeIsOpen(false);
			} else {
				setEndTimeIsOpen(id);
			}
			setStartTimeIsOpen(false);
		}
		if (field === "start") {
			if (startTimeIsOpen === id) setStartTimeIsOpen(false);
			else {
				setStartTimeIsOpen(id);
			}
			setEndTimeIsOpen(false);
		}
	};
	const isDuplicate = useMemo(() => {
		return (
			onboardingMentor.availability.length >= 1 &&
			onboardingMentor.availability.some((sch) => sch.day === schedule.day)
		);
	}, [onboardingMentor, schedule]);

	const updateSchedule = (args: { field: keyof TimeSlot; time: ICurrentTime; day: string }) => {
		const { day, time, field } = args;
		const formattedTime = `${String(time.min).padStart(2, "0")}:${String(time.secs).padStart(2, "0")}${
			time.meridan
		}`;

		setSchedule((prev) => {
			const updated = { ...prev };
			if (field === "startTime") {
				updated.timeSlots = [
					{
						...schedule.timeSlots[0],
						startTime: formattedTime,
					},
					...schedule.timeSlots.slice(1),
				];
			}
			if (field === "endTime") {
				updated.timeSlots = [
					{
						...schedule.timeSlots[0],
						endTime: formattedTime,
					},
					...schedule.timeSlots.slice(1),
				];
			}
			updated.day = day;
			return updated;
		});

		setEndTimeIsOpen(false);
		setStartTimeIsOpen(false);
	};

	useEffect(() => {
		// console.log(schedule);
		// Reflect Updates
		const newArr = [...onboardingMentor.availability];
		if (!isDuplicate && schedule !== initialSchedule) {
			newArr.push({ ...schedule, isAvailable: true });
			// setSchedule(initialSchedule);
		}
		const toBeUpdated = onboardingMentor.availability.findIndex((sch) => sch.day === schedule.day);
		newArr[toBeUpdated] = { ...newArr[toBeUpdated], ...schedule };
		dispatch(
			setOnboardingMentor({
				...onboardingMentor,
				availability: newArr,
			}),
		);
	}, [schedule]);

	useEffect(() => {
		if (timepickerRef.current)
			if (startTimeIsOpen || endTimeIsOpen)
				timepickerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}, [startTimeIsOpen, endTimeIsOpen]);

	return (
		<div className="">
			<div className="grid gap-4">
				<div className="text-sm hidden md:grid gap-1 grid-cols-8 items-center text-[#B1B1B1] font-semibold">
					<h1 className="col-span-2">Day</h1>
					<h1 className="col-span-6">Time slots</h1>
				</div>
				{days.map((day, id) => (
					<div
						key={id}
						className="text-sm grid gap-1 md:grid-cols-8 items-center bg-white border border-[#00D569] p-3">
						<div className="col-span-2">
							<h1 className="">{day}</h1>
						</div>
						{/* 
						// Todo: use the TimeSelectorModal to set the startTime and endTime (45mins per session)
						 */}
						<div className="col-span-3 grid gap-1 relative">
							<CustomTextInput
								name="StartTime"
								id="StartTime"
								type="text"
								className="text-black select-none cursor-pointer"
								placeholder="Start Time"
								containerprops={{
									className: "border border-zinc-200",
								}}
								readOnly
								value={
									onboardingMentor.availability.find((schedule) => schedule.day === day)?.timeSlots[0]
										.startTime
								}
								onClick={() =>
									openTimePicker({
										field: "start",
										id,
									})
								}
							/>
							{startTimeIsOpen === id && !endTimeIsOpen && (
								<div className="absolute right-0 top-16 w-full">
									<TimePicker
										ref={timepickerRef}
										onChange={(time) =>
											updateSchedule({
												field: "startTime",
												time,
												day,
											})
										}
										closeTimePicker={closeTimePicker}
									/>
								</div>
							)}
						</div>
						<div className="col-span-3 grid gap-1 relative">
							<CustomTextInput
								name="EndTime"
								id="EndTime"
								type="text"
								className="text-black select-none cursor-pointer"
								placeholder="End Time"
								containerprops={{
									className: "border border-zinc-200",
								}}
								readOnly
								value={
									onboardingMentor.availability.find((schedule) => schedule.day === day)?.timeSlots[0]
										.endTime
								}
								onClick={() =>
									openTimePicker({
										field: "end",
										id,
									})
								}
							/>
							{endTimeIsOpen === id && !startTimeIsOpen && (
								<div className="absolute right-0 top-16 w-full">
									<TimePicker
										ref={timepickerRef}
										onChange={(time) =>
											updateSchedule({
												field: "endTime",
												time,
												day,
											})
										}
										closeTimePicker={closeTimePicker}
									/>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Availability;
