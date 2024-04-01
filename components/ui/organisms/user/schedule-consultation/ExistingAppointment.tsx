import React, { useId } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../interfaces/mentor.interface";
import { daysOfTheWeek, ToastDefaultOptions } from "../../../../../constants";
import { PrimaryButton } from "../../../atom/buttons";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { VERIFY_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/authSlice";
import { formatGqlError } from "../../../../../utils/auth";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { useModal } from "../../../../../context/modal.context";
import ReasonModal from "../../../atom/modals/ReasonModal";
import AppointmentRescheduleModal from "../../../atom/modals/AppointmentRescheduleModal";

const ExistingAppointment = (existingAppointment: IAppointment) => {
	const dispatch = useDispatch();
	const user = useSelector(currentUser);
	const [confirmPayment, { loading: confirmLoading }] = useMutation<
		{ verifyPayment: { appointment: IAppointment } },
		{ reference: string }
	>(VERIFY_PAYMENT, {
		variables: { reference: String(existingAppointment.paymentReference) },
	});

	const toastId = useId();
	const date = new Date(existingAppointment.date);
	const { openModal } = useModal();

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

	const handleCancel = async () => {
		if (
			existingAppointment.status !== AppointmentStatus.CANCELLED_BY_USER &&
			existingAppointment.status !== AppointmentStatus.CANCELLED_BY_MENTOR
		) {
			openModal(<ReasonModal {...existingAppointment} />, { animate: false, closeOnBackgroundClick: false });
		}
	};

	const handleReschedule = async () => {
		if (
			existingAppointment.status == AppointmentStatus.PENDING ||
			existingAppointment.status == AppointmentStatus.ACCEPTED ||
			existingAppointment.status == AppointmentStatus.RESCHEDULED_BY_USER
		) {
			openModal(<AppointmentRescheduleModal {...existingAppointment} />, {
				animate: false,
				closeOnBackgroundClick: false,
			});
		}
	};

	const handleConfirmPayment = async () => {
		if (existingAppointment.status == AppointmentStatus["AWAITING_PAYMENT"])
			try {
				const { data } = await confirmPayment();
				const response = data?.verifyPayment;
				if (response?.appointment) updateLocalState(response.appointment);
			} catch (error) {
				console.error({ error });
				const errMsg = formatGqlError(error);
				toast.error(errMsg || "Something went wrong", { ...ToastDefaultOptions(), toastId });
			}
	};

	const updateLocalState = (data: IAppointment) => {
		let appointments = user?.appointments || [];

		const index = appointments.findIndex((appointment) => appointment.id === data.id);
		if (index !== -1) {
			const updatedAppointment = {
				...appointments[index],
				status: AppointmentStatus.ACCEPTED,
				date: data.date,
			};
			appointments = [...appointments.slice(0, index), updatedAppointment, ...appointments.slice(index + 1)];
			dispatch(updateUserProfile({ appointments }));
		}
	};
	return (
		<>
			{existingAppointment.status == AppointmentStatus.AWAITING_PAYMENT ? (
				<p className="italic text-sm text-[#9a9898] my-2">
					Your request is being processed, but your payment has not been confirmed.
					<br />
					If you have made payments, you will recieve a notification when mentor accepts this request.
				</p>
			) : existingAppointment.status == AppointmentStatus.PENDING ||
			  existingAppointment.status == AppointmentStatus.RESCHEDULED_BY_USER ? (
				<p className="italic text-sm text-[#9a9898] my-2">
					Your request is pending.
					<br />
					You will recieve a notification when mentor accepts this request.
				</p>
			) : existingAppointment.status == AppointmentStatus.ACCEPTED ? (
				<p className="italic text-sm text-[#9a9898] my-2">
					Your request has been accepted.
					<br />
					You will recieve a notification before the session starts.
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

			<div className="flex sm:flex-row flex-col my-2 gap-4 sm:items-center">
				<PrimaryButton
					onClick={handleCancel}
					disabled={confirmLoading}
					title="Cancel appointment"
					className="text-sm flex justify-center items-center bg-[#F6937B] p-2 px-5"
				/>
				{existingAppointment.status === AppointmentStatus.AWAITING_PAYMENT ? (
					<PrimaryButton
						onClick={handleConfirmPayment}
						title={!confirmLoading ? "Confirm Payment" : ""}
						disabled={confirmLoading}
						icon={confirmLoading ? <ActivityIndicator /> : <></>}
						className="text-sm flex justify-center items-center p-2 px-5"
					/>
				) : (
					(existingAppointment.status === AppointmentStatus.PENDING ||
						existingAppointment.status === AppointmentStatus.ACCEPTED ||
						existingAppointment.status == AppointmentStatus.RESCHEDULED_BY_USER ||
						existingAppointment.status == AppointmentStatus.OVERDUE) && (
						<PrimaryButton
							onClick={handleReschedule}
							title="Reschedule"
							className="text-sm flex justify-center items-center p-2 px-5"
						/>
					)
				)}
			</div>
		</>
	);
};

export default ExistingAppointment;
