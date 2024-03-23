import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CloseSharp } from "react-ionicons";
import { IMentor } from "../../../../interfaces/mentor.interface";

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
							{mentor?.availability.map((date, ind) => {
								return (
									<div
										key={ind}
										className="flex gap-6 text-sm sm:justify-start justify-between w-full items-center">
										<h1 className="font-medium">{date.day}</h1>
										<p className="font-[300]">
											{date.timeSlots[0].startTime} - {date.timeSlots[0].endTime}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="grid gap-3 flex-grow w-full lg:w-[35%]">
					<div className="text-[#06310B] flex md:flex-row flex-col sm:flex-nowrap flex-wrap items-start xl:items-center gap-4">
						<div className="border border-[#70C5A1] overflow-hidden relative w-full flex items-center gap-2 justify-between pt-6 pb-3">
							<label htmlFor={`${id}-date`} className="absolute top-0 left-3 text-sm text-[#094B10]">
								Date
							</label>
							<input
								ref={dayInputRef}
								className="text-sm placeholder:text-[#094B10] text-[#094B10] w-1/3 text-center focus:ring-0 outline-none"
								placeholder="DD"
								type="text"
								maxLength={2}
								value={day}
								onChange={handleDayChange}
								style={{ fontFamily: "Days One" }}
							/>
							<p className="" style={{ fontFamily: "Days One" }}>
								-
							</p>
							<input
								ref={monthInputRef}
								className="text-sm placeholder:text-[#094B10] text-[#094B10] w-1/3 text-center focus:ring-0 outline-none"
								placeholder="MM"
								type="text"
								maxLength={2}
								value={month}
								onChange={handleMonthChange}
								style={{ fontFamily: "Days One" }}
							/>
							<p className="" style={{ fontFamily: "Days One" }}>
								-
							</p>
							<input
								ref={yearInputRef}
								className="text-sm placeholder:text-[#094B10] text-[#094B10] w-1/3 text-center focus:ring-0 outline-none"
								placeholder="YYYY"
								type="text"
								maxLength={4}
								value={year}
								style={{ fontFamily: "Days One" }}
							/>
						</div>
						<div className="border border-[#70C5A1] overflow-hidden relative w-full flex items-center gap-3 justify-between pt-6 pb-3">
							<label htmlFor={`${id}-time`} className="absolute top-0 left-3 text-sm text-[#094B10]">
								Time
							</label>
							<input
								ref={hourRef}
								className="text-sm placeholder:text-[#094B10] text-[#094B10] w-1/3 text-center focus:ring-0 outline-none"
								placeholder="HH"
								type="text"
								maxLength={2}
								value={hour}
								onChange={handleTimeChange("hour")}
								style={{ fontFamily: "Days One" }}
							/>
							<p className="" style={{ fontFamily: "Days One" }}>
								:
							</p>
							<input
								ref={minuteRef}
								className="text-sm placeholder:text-[#094B10] text-[#094B10] w-1/3 text-center focus:ring-0 outline-none"
								placeholder="MM"
								type="text"
								maxLength={2}
								value={minute}
								style={{ fontFamily: "Days One" }}
								onChange={handleTimeChange("minute")}
							/>
						</div>
					</div>
					<div className="">
						{/* <button onClick={addSchedule} className="text-[#70C5A1] text-sm">
							+ Add New date and Time
						</button> */}
						<PrimaryButton title="Proceed" className="p-2 px-8" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleConsultationTemplate;
