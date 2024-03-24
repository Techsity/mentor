import React, { ChangeEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CloseSharp } from "react-ionicons";
import { IMentor, IMentorAvailability, TimeSlot } from "../../../../interfaces/mentor.interface";
import { daysOfTheWeek } from "../../../../constants";
import { slugify } from "../../../../utils";
import classNames from "classnames";

interface ScheduleItem {
	id: string;
	date: string;
	time: string;
}

const ScheduleConsultationTemplate = ({ loading, mentor }: { mentor?: IMentor; loading?: boolean }) => {
	const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([]);
	// BOOK_MENTOR
	const id = useId();
	const today = new Date().getDate();
	const currentMonth = new Date().getMonth() + 1;

	const emptyState: ScheduleItem = {
		id,
		date: "",
		time: "",
	};
	const [schedule, setSchedule] = useState<ScheduleItem>(emptyState);
	const [day, setDay] = useState<string>("");
	const [month, setMonth] = useState<string>("");
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());

	const [hour, setHour] = useState<string>("");
	const [minute, setMinute] = useState<string>("");

	const dayInputRef = useRef<HTMLInputElement>(null);
	const monthInputRef = useRef<HTMLInputElement>(null);
	const yearInputRef = useRef<HTMLInputElement>(null);
	const hourRef = useRef<HTMLInputElement>(null);
	const minuteRef = useRef<HTMLInputElement>(null);

	const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		if (value.length > 2) value = value.slice(0, 2);
		setDay(value.replace(/\D/g, ""));
		if (value.length === 2 && monthInputRef.current) monthInputRef.current.focus();
		setSchedule((p) => {
			return { ...p, date: `${value}-${month}-${year}` };
		});
		// setMonth("00");
	};

	const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		if (value.length > 2) value = value.slice(0, 2);
		setMonth(value.replace(/\D/g, ""));
		if (value.length === 2 && yearInputRef.current) yearInputRef.current.focus();
		else if (value.length === 0 && dayInputRef.current) dayInputRef.current.focus();
		setSchedule((p) => {
			return { ...p, date: `${day}-${value}-${year}` };
		});
	};

	useEffect(() => {
		if (day) if (day.length == 2 && Number(day) < today) setDay(today.toString().padStart(2, "0"));
		if (month) {
			if (month.length == 2 && (Number(month) < currentMonth || Number(month) > 12))
				setMonth(currentMonth.toString().padStart(2, "0"));
		}
	}, [day, month]);

	const handleTimeChange = (name: "hour" | "minute") => (e: ChangeEvent<HTMLInputElement>) => {};

	//
	const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
	const currentDayOfTheWeek = new Date().getDay();
	const mentorAvailableDay = mentor?.availability.find(
		(date) => date.day.toLowerCase() === daysOfTheWeek[currentDayOfTheWeek].toLowerCase(),
	);

	const handleSelectTimeSlot = (slot: TimeSlot) => {
		if (mentorAvailableDay?.day) setSelectedSlot({ date: mentorAvailableDay.day, time: slot });
	};
	return (
		<div className="py-10 h-full lg:px-20 sm:px-12 px-6">
			<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			<div className="flex lg:flex-row flex-col justify-between gap-5 py-6 w-full md:mt-5 items-start animate__animated animate__fadeInUp overflow-hidden">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white lg:w-[45%] w-full">
					<div className="">
						<div className="flex justify-between items-center">
							<h1 className="font-medium">Availability</h1>
							<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
						</div>
						<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
							{daysOfTheWeek.map((d, index) => {
								const mentorIsAvailable = Boolean(
									mentor?.availability.find((date) => date.day.toLowerCase() == d.toLowerCase()),
								);
								return (
									<div
										key={index}
										className={classNames(
											!mentorIsAvailable ? "text-gray-500" : "text-white",
											"flex gap-6 text-sm sm:justify-start justify-between w-full items-center",
										)}>
										<h1 className="font-medium capitalize">{d}</h1>
										<p className="font-[300]">{mentorIsAvailable ? "Available" : "Unavailable"}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="grid gap-3 flex-grow w-full lg:w-[35%]">
					{mentorAvailableDay ? (
						<>
							<p className="">
								Mentor&apos;s <span className="font-medium">{mentorAvailableDay.day}</span> schedule
							</p>
							<span className="italic text-sm text-[#9A9898]">
								Select a time suitable to schedule a virtual meeting with this mentor;
							</span>
							<div className="flex flex-col gap-2">
								{mentorAvailableDay.timeSlots.map((slot, i) => {
									const hour = parseInt(slot.startTime.split(":")[0]);
									const currentHr = new Date().getHours();
									const isAM = slot.startTime.slice(-2).toUpperCase() === "AM";
									const timePassed = !isAM
										? currentHr >= (hour == 12 ? 12 : hour + 12)
										: currentHr >= hour;
									return (
										<span
											className={classNames(
												timePassed || !slot.isOpen
													? "grayscale cursor-disabled text-gray-300"
													: "",
												"flex items-center gap-2 cursor-pointer select-none",
											)}
											key={i}
											onClick={() => {
												if (!timePassed && slot.isOpen) handleSelectTimeSlot(slot);
											}}>
											<input
												disabled={timePassed || !slot.isOpen}
												type="radio"
												checked={selectedSlot?.time == slot}
											/>
											{slot.startTime} - {slot.endTime}
										</span>
									);
								})}
							</div>

							{selectedSlot && (
								<div className="mt-4">
									<PrimaryButton
										title="Continue"
										className="p-2 px-8 animate__animated animate__fadeIn rounded"
									/>
								</div>
							)}
						</>
					) : (
						<p className="text-sm text-red-600">Sorry, this mentor is unavailable today.</p>
					)}
				</div>
			</div>
		</div>
	);
};

type SelectedSlot = { date: string; time: TimeSlot };

export default ScheduleConsultationTemplate;
