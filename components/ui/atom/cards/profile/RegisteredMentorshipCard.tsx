/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AppointmentStatus, IAppointment } from "../../../../../interfaces/mentor.interface";
import classNames from "classnames";

const RegisteredMentorshipCard = (session: IAppointment) => {
	const SessionIndicator = () => {
		const formatTime = (hour: number, minutes: number) => {
			const formattedHour = hour <= 12 ? hour : hour - 12;
			const formattedMinutes = minutes.toString().padStart(2, "0");
			return `${formattedHour}:${formattedMinutes}`;
		};

		const date = new Date(session.date);
		const startHour = date.getHours();
		const startMinutes = date.getMinutes();
		const isAmStart = startHour < 12;

		return (
			<div
				className={classNames(
					"h-12  w-full text-white flex items-center gap-3 p-5 justify-start",
					session.status === AppointmentStatus.PENDING
						? "bg-yellow-500"
						: session.status === AppointmentStatus.ACCEPTED
						? "bg-[#70C5A1]"
						: AppointmentStatus.OVERDUE && "bg-[#F6937B]",
				)}>
				<p className="text-sm">
					{date.toDateString()} - {formatTime(startHour, startMinutes)} {isAmStart ? "AM" : "PM"}
				</p>
				<div className="flex items-center">
<div className=""></div>
<div className=""></div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="flex flex-col gap-5 bg-white shadow hover:shadow-lg h-[150px] cursor-pointer select-none duration-300">
				<SessionIndicator />
				<div className="flex items-center gap-3 p-2">
					<div className="">
						<img
							src={session.mentor.user.avatar || "/assets/images/avatar.png"}
							alt={session.mentor.user.name}
							className="text-sm rounded-full h-14 w-14"
						/>
					</div>
					<div className="">
						<h1 className="font-semibold text-black">{session.mentor.user.name}</h1>
						<p className="text-sm text-[#B1B1B1]">{session.mentor.role}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisteredMentorshipCard;
