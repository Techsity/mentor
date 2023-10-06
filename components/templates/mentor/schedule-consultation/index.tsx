import React, { useRef, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { IMentor } from "../../../../interfaces";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CloseSharp } from "react-ionicons";

interface ScheduleItem {
	id: string;
	date: string;
	time: string;
}

const ScheduleConsultationTemplate = (mentor: IMentor) => {
	const emptyState: ScheduleItem = {
		id: (new Date().getMilliseconds() * Math.random() * 2).toString(),
		date: "",
		time: "",
	};
	const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([emptyState]);

	const addSchedule = () => {
		if (scheduleList.length < 4) setScheduleList([...scheduleList, emptyState]);
	};

	return (
		<div className="min-h-screen pt-20 h-full lg:px-20 sm:px-12 px-6">
			<div className=" animate__animated animate__slideInDown">
				<MentorProfileCard mentor={mentor} detailsPage />
			</div>
			<div className="flex md:flex-row flex-col justify-between gap-5 py-6 w-full mt-10 items-start">
				<div className="bg-[#06310B] p-8 px-10 text-white overflow-hidden flex-grow sm:w-auto w-full animate__animated animate__slideInUp">
					<div className="">
						<h1 className="font-medium">My Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
						{/* {mentor.daysOpen} */}
						<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Mondays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>
							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>
							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>
							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>

							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>

							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>

							<div className="flex justify-between gap-5 w-full items-center">
								<h1 className="font-medium">Tuesdays</h1>
								<p className="font-[300] text-sm">10am - 5pm</p>
							</div>
						</div>
					</div>
				</div>
				<div className="grid gap-3 flex-grow animate__animated animate__slideInRight">
					{scheduleList.map((schedule, index) => (
						<div className="relative mb-8" key={index}>
							<SchedulerDiv />{" "}
							<span
								className="absolute right-0 -top-6"
								onClick={() => {
									if (scheduleList.length > 1)
										setScheduleList((prevScheduleList) =>
											prevScheduleList.filter(({ id }) => schedule.id !== id),
										);
								}}
							>
								<CloseSharp color="red" cssClasses="cursor-pointer" />
							</span>
						</div>
					))}
					<div className="my-5">
						<button onClick={addSchedule} className="text-[#70C5A1] text-sm">
							+ Add New date and Time
						</button>
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
	<div className="text-[#06310B] flex xl:flex-row flex-1 md:flex-col items-start xl:items-center gap-4 animate__animated animate__fadeInUp">
		<div className="border border-[#70C5A1] overflow-hidden relative w-full">
			<label
				htmlFor="date"
				className="absolute top-0 left-3 text-sm text-[#094B10]"
			>
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
			<label
				htmlFor="time"
				className="absolute top-0 left-3 text-sm text-[#094B10]"
			>
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
			<PrimaryButton
				title="Start an Instant Chat"
				className="w-full p-2.5 px-5 whitespace-nowrap"
			/>
		</div>
	</div>
);

export default ScheduleConsultationTemplate;
