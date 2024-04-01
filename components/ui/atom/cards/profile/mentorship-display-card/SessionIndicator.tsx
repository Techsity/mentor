import React, { FC } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { formatAppointmentTime } from "../../../../../../utils";

const SessionIndicator: FC<{ session: IAppointment }> = ({ session }) => {
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
			<div className="text-sm">
				{date.toDateString()}
				<div className="border-b border-white w-full" />
				{formatAppointmentTime(startHour, startMinutes)} {isAmStart ? "AM" : "PM"} -{" "}
				{formatAppointmentTime(endHour, endMinutes)} {isAmEnd ? "AM" : "PM"}
			</div>
		</div>
	);
};

export default SessionIndicator;
