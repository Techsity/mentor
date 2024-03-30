import React, { FC } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../../interfaces/mentor.interface";
import classNames from "classnames";

const SessionIndicator: FC<{ session: IAppointment }> = ({ session }) => {
	const formatTime = (hour: number, minutes: number) => {
		const formattedHour = hour <= 12 ? hour : hour - 12;
		const formattedMinutes = minutes.toString().padStart(2, "0");
		return `${formattedHour}:${formattedMinutes}`;
	};

	const date = new Date(session.date);
	const startHour = date.getHours();
	const startMinutes = date.getMinutes();
	const isAmStart = startHour < 12;

	const endHour = date.getHours() + 1;
	const endMinutes = date.getMinutes();
	const isAmEnd = endHour < 12;

	return (
		<div
			className={classNames(
				"h-12  w-full text-white flex items-center gap-3 p-5 justify-start",
				session.status === AppointmentStatus.DECLINED ? "bg-[#cccccc] grayscale" : "bg-[#70C5A1]",
			)}>
			<p className="text-sm">
				{date.toDateString()}
				<hr className="border-white w-full" />
				{formatTime(startHour, startMinutes)} {isAmStart ? "AM" : "PM"} - {formatTime(endHour, endMinutes)}{" "}
				{isAmEnd ? "AM" : "PM"}
			</p>
		</div>
	);
};

export default SessionIndicator;
