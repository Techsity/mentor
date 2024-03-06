import React, { useRef, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CloseSharp } from "react-ionicons";
import { IMentor } from "../../../../interfaces/mentor.interface";

interface ScheduleItem {
	id: string;
	date: string;
	time: string;
}

const ScheduleConsultationTemplate = ({ loading, mentor }: { mentor?: IMentor; loading: boolean }) => {
	const emptyState: ScheduleItem = {
		id: (new Date().getMilliseconds() * Math.random() * 2).toString(),
		date: "",
		time: "",
	};
	const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([emptyState]);

	const addSchedule = () => {
		if (scheduleList.length < 4) setScheduleList([...scheduleList, emptyState]);
	};
	const handleDeleteSchedule = (schedule: ScheduleItem, index: number) => {
		if (index !== 0)
			if (scheduleList.length > 1)
				setScheduleList((prevScheduleList) => prevScheduleList.filter(({ id }) => schedule.id !== id));
	};
	return (
		<div className="min-h-screen pt-20 h-full lg:px-20 sm:px-12 px-6">
			<div className="animate__animated animate__slideInDown animate__fast">
				<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			</div>
			<div className="flex lg:flex-row flex-col justify-between gap-5 py-6 w-full md:mt-10 items-start">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white overflow-hidden flex-grow lg:w-auto w-full animate__animated animate__slideInUp">
					<div className="">
						<h1 className="font-medium">My Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
						<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
							{mentor?.availability.map((date, ind) => {
								return (
									<div
										key={ind}
										className="flex gap-6 sm:justify-start justify-between w-full items-center">
										<h1 className="font-medium">{date.day}</h1>
										<p className="font-[300] text-sm">
											{date.timeSlots[0].startTime} - {date.timeSlots[0].endTime}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="grid gap-3 flex-grow mt-5 w-full lg:w-auto">
					{scheduleList.map((schedule, index) => (
						<div className="relative mb-8" key={index}>
							<SchedulerDiv />
							{index !== 0 && (
								<span
									className="absolute right-0 -top-6"
									onClick={() => handleDeleteSchedule(schedule, index)}>
									<CloseSharp color="red" cssClasses="cursor-pointer" />
								</span>
							)}
						</div>
					))}
					<div className="my-5">
						{/* <button onClick={addSchedule} className="text-[#70C5A1] text-sm">
							+ Add New date and Time
						</button> */}
						<div className="mt-5">
							<PrimaryButton title="Proceed" className="p-3 px-8" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const SchedulerDiv = () => (
	<div className="text-[#06310B] flex sm:flex-row flex-col sm:flex-nowrap flex-wrap items-start xl:items-center gap-4 animate__animated animate__fadeInUp">
		<div className="border border-[#70C5A1] overflow-hidden relative w-full">
			<label htmlFor="date" className="absolute top-0 left-3 text-sm text-[#094B10]">
				Date
			</label>
			<input
				className="p-2 px-4 placeholder:text-[#094B10] text-[#094B10] w-full text-center pt-6"
				placeholder="Date"
				type="date"
				id="date"
				min={new Date().toISOString().split("T")[0]}
				style={{ fontFamily: "Days One" }}
			/>
		</div>
		<div className="border border-[#70C5A1] overflow-hidden relative w-full">
			<label htmlFor="time" className="absolute top-0 left-3 text-sm text-[#094B10]">
				Time
			</label>
			<input
				className="p-2 px-4 placeholder:text-[#094B10] text-[#094B10] w-full text-center pt-6"
				placeholder="Time"
				id="time"
				type="time"
				step="60"
				style={{ fontFamily: "Days One" }}
			/>
		</div>
		<div className="">
			<PrimaryButton title="Start an Instant Chat" className="w-full p-2.5 px-5 whitespace-nowrap" />
		</div>
	</div>
);

export default ScheduleConsultationTemplate;
