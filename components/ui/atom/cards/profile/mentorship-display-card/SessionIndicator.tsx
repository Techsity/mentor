import React, { FC } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { formatAppointmentTime } from "../../../../../../utils";
import { currentUser } from "../../../../../../redux/reducers/auth/authSlice";
import { useSelector } from "react-redux";

const SessionIndicator: FC<{ session: IAppointment }> = ({ session }) => {
	const user = useSelector(currentUser);
	const date = new Date(session.date);
	const startHour = date.getHours();
	const startMinutes = date.getMinutes();
	const isAmStart = startHour < 12;

	const endHour = date.getHours() + 1;
	const endMinutes = date.getMinutes();
	const isAmEnd = endHour < 12;

	const cancelledBy =
		(session.status === AppointmentStatus.CANCELLED_BY_MENTOR ||
			session.status === AppointmentStatus.CANCELLED_BY_USER) &&
		session.status.split("_").join(" ").toLowerCase();

	const rescheduledBy =
		(session.status === AppointmentStatus.RESCHEDULED_BY_USER ||
			session.status === AppointmentStatus.RESCHEDULED_BY_MENTOR) &&
		session.status.split("_").join(" ").toLowerCase();

	const invalidSession =
		session.status === AppointmentStatus.DECLINED ||
		session.status === AppointmentStatus.CANCELLED_BY_USER ||
		session.status === AppointmentStatus.CANCELLED_BY_MENTOR;

	return (
		<div
			className={classNames(
				"h-12  w-full text-white flex items-center gap-3 p-5 justify-between",
				invalidSession ? "bg-[#cccccc] grayscale" : "bg-[#70C5A1]",
			)}>
			<div className="text-sm">
				{date.toDateString()}
				<div className="border-b border-white w-full" />
				{formatAppointmentTime(startHour, startMinutes)} {isAmStart ? "AM" : "PM"} -{" "}
				{formatAppointmentTime(endHour, endMinutes)} {isAmEnd ? "AM" : "PM"}
			</div>
			{rescheduledBy && <span className="text-xs text-gray-600 capitalize">{rescheduledBy}</span>}
			{cancelledBy && (
				<span className="text-xs text-gray-600 capitalize">
					{!user?.is_mentor &&
						(cancelledBy.toLowerCase().includes("user")
							? "Cancelled by you"
							: cancelledBy.toLowerCase().includes("mentor") && "Cancelled by mentor")}
					{user?.is_mentor &&
						(cancelledBy.toLowerCase().includes("mentor")
							? "Cancelled by you"
							: cancelledBy.toLowerCase().includes("user") && "Cancelled by user")}
				</span>
			)}
		</div>
	);
};

export default SessionIndicator;
