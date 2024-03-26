import React, { useId } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../interfaces/mentor.interface";
import { daysOfTheWeek, ToastDefaultOptions } from "../../../../../constants";
import { PrimaryButton } from "../../../atom/buttons";
import { toast } from "react-toastify";

const ExistingAppointment = (existingAppointment: IAppointment) => {
	const toastId = useId();
	const date = new Date(existingAppointment.date);
	const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const dayIndex = date.getDay();
	const day = daysOfTheWeek[dayIndex];
	const startHour = date.getHours();
	const startMinutes = date.getMinutes();

	const endDateTime = new Date(date.getTime() + 60 * 60 * 1000);
	const endHour = endDateTime.getHours();
	const endMinutes = endDateTime.getMinutes();
	const isAmStart = startHour < 12;
	const isAmEnd = endHour < 12;

	const overdueDate = new Date(date);
	overdueDate.setDate(date.getDate() + 8);

	const formatTime = (hour: number, minutes: number) => {
		const formattedHour = hour <= 12 ? hour : hour - 12;
		const formattedMinutes = minutes.toString().padStart(2, "0");
		return `${formattedHour}:${formattedMinutes}`;
	};

	const handleCancel = () => {
		if (existingAppointment.status !== AppointmentStatus.CANCELED)
			// Todo: popup reason modal
			toast.success("Appointment cancelled", { ...ToastDefaultOptions({ id: "success" }) });
	};

	const handleReminder = async () => {
		if (existingAppointment.status == AppointmentStatus.OVERDUE)
			toast.success("Reminder sent", { ...ToastDefaultOptions(), toastId });
	};

	return (
		<>
			{existingAppointment.status == AppointmentStatus.AWAITING_PAYMENT ||
			existingAppointment.status == AppointmentStatus.AWAITING_PAYMENT.toUpperCase() ? (
				<p className="italic text-sm text-[#9a9898] my-2">
					Your request is being processed, but your payment has not been confirmed.
					<br />
					If you have made payments, you will recieve a notification when mentor accepts this request.
				</p>
			) : existingAppointment.status == AppointmentStatus.PENDING ? (
				<p className="italic text-sm text-[#9a9898] my-2">
					Your request is pending.
					<br />
					You will recieve a notification when mentor accepts this request.
				</p>
			) : (
				existingAppointment.status == AppointmentStatus.OVERDUE && (
					<p className="italic text-sm text-[#9a9898] my-2">
						Your request got overdue on {overdueDate.toDateString()}. <br /> Send a reminder to the mentor
						to reschedule this appointment.
					</p>
				)
			)}

			<div className="flex sm:flex-row flex-col items-center justify-between gap-2 animate__animated animate__fadeIn text-[#094B10]">
				<div
					className="text-sm border border-[#70C5A1] p-3 w-full capitalize text-center"
					style={{ fontFamily: "Days One" }}>
					{day}
				</div>
				<div
					className="text-sm border border-[#70C5A1] p-3 w-full text-center"
					style={{ fontFamily: "Days One" }}>
					{formatTime(startHour, startMinutes)} {isAmStart ? "AM" : "PM"} - {formatTime(endHour, endMinutes)}{" "}
					{isAmEnd ? "AM" : "PM"}
				</div>
			</div>

			<div className="flex my-2 gap-4 items-center">
				<PrimaryButton
					onClick={handleCancel}
					title="Cancel appointment"
					className="text-sm bg-[#F6937B] p-2 px-5"
				/>
				{existingAppointment.status === AppointmentStatus.OVERDUE && (
					<PrimaryButton onClick={handleReminder} title="Send reminder" className="text-sm p-2 px-5" />
				)}
			</div>
		</>
	);
};

export default ExistingAppointment;
