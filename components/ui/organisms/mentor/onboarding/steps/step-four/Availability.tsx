import React, { useEffect, useMemo, useState } from "react";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import TimePicker, {
	ICurrentTime,
} from "../../../../../atom/common/TimePicker";

const Availability = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initialSchedule = {
		day: "",
		time: { end: "", start: "" },
	};
	const [schedule, setSchedule] = useState<ISchedule>(initialSchedule);
	const [startTimeIsOpen, setStartTimeIsOpen] = useState<React.Key | false>(
		false,
	);
	const [endTimeIsOpen, setEndTimeIsOpen] = useState<React.Key | false>(
		false,
	);

	const closeTimePicker = () => {
		setStartTimeIsOpen(false);
		setEndTimeIsOpen(false);
	};
	const openTimePicker = (args: {
		field: "end" | "start";
		id: React.Key;
	}) => {
		const { field, id } = args;
		if (field === "end") {
			if (endTimeIsOpen === id) setEndTimeIsOpen(false);
			else {
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
			onboardingMentor.availability.some(
				(sch) => sch.day === schedule.day,
			)
		);
	}, [onboardingMentor, schedule]);

	const updateSchedule = (args: {
		field: keyof ISchedule["time"];
		time: ICurrentTime;
		day: string;
	}) => {
		const { day, time, field } = args;
		const formattedTime = `${String(time.hr).padStart(2, "0")}:${String(
			time.min,
		).padStart(2, "0")}${time.meridan}`;

		setSchedule({
			day,
			time: { ...schedule.time, [field]: formattedTime },
		});

		setEndTimeIsOpen(false);
		setStartTimeIsOpen(false);
	};

	useEffect(() => {
		console.log(schedule);
		// Reflect Updates
		const newArr = [...onboardingMentor.availability];
		if (!isDuplicate && schedule !== initialSchedule) {
			newArr.push(schedule);
			// setSchedule(initialSchedule);
		}
		const toBeUpdated = onboardingMentor.availability.findIndex(
			(sch) => sch.day === schedule.day,
		);
		newArr[toBeUpdated] = { ...newArr[toBeUpdated], ...schedule };
		dispatch(
			setOnboardingMentor({
				...onboardingMentor,
				availability: newArr,
			}),
		);
	}, [schedule]);

	return (
		<div className="">
			<div className="grid gap-4">
				<div className="text-sm hidden md:grid gap-1 grid-cols-8 items-center text-sm text-[#B1B1B1] font-semibold">
					<h1 className="col-span-2">Day</h1>
					<h1 className="col-span-6">Time</h1>
				</div>
				{days.map((day, id) => (
					<div
						key={id}
						className="text-sm grid gap-1 md:grid-cols-8 items-center bg-white border border-[#00D569] p-3">
						<div className="col-span-2">
							<h1 className="">{day}</h1>
						</div>
						<div className="col-span-3 grid gap-1 relative">
							<CustomTextInput
								name="StartTime"
								id="StartTime"
								type="text"
								className="text-black select-none cursor-pointer"
								placeholder="Start Time"
								containerProps={{
									className: "border border-zinc-200",
								}}
								readOnly
								value={
									onboardingMentor.availability.find(
										(sch) => sch.day === day,
									)?.time.start
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
										onChange={(time) =>
											updateSchedule({
												field: "start",
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
								containerProps={{
									className: "border border-zinc-200",
								}}
								readOnly
								value={
									onboardingMentor.availability.find(
										(sch) => sch.day === day,
									)?.time.end
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
										onChange={(time) =>
											updateSchedule({
												field: "end",
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

export interface ISchedule {
	day: string;
	time: { start: string; end: string };
}

const days: string[] = [
	"Mondays",
	"Tuesdays",
	"Wednesdays",
	"Thursdays",
	"Fridays",
	"Saturdays",
	"Sundays",
];

export default Availability;
