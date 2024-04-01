import React, { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { useModal } from "../../../../context/modal.context";
import { useMutation, useQuery } from "@apollo/client";
import { formatGqlError } from "../../../../utils/auth";
import { toast } from "react-toastify";
import { daysOfTheWeek, ToastDefaultOptions } from "../../../../constants";
import { PrimaryButton } from "../buttons";
import classNames from "classnames";
import ActivityIndicator from "../loader/ActivityIndicator";
import { IAppointment, IMentor } from "../../../../interfaces/mentor.interface";
import { VIEW_MENTOR_AVAILABILITY } from "../../../../services/graphql/queries/mentor";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, updateUserProfile } from "../../../../redux/reducers/authSlice";
import { SelectedSlot } from "../../organisms/user/schedule-consultation/NewAppointment";
import { RESCHEDULE_APPOINTMENT } from "../../../../services/graphql/mutations/user";

const AppointmentRescheduleModal = (appointment: IAppointment) => {
	const { mentor } = appointment;
	const currentAppointmentDate = new Date(appointment.date);

	const {
		data,
		loading: availabilityLoading,
		refetch,
	} = useQuery<{ viewMentor: IMentor }, any>(VIEW_MENTOR_AVAILABILITY, {
		variables: { viewMentorId: mentor.id },
	});
	const [reschduleAppointment, { loading }] = useMutation<
		{ rescheduleAppointment: IAppointment },
		{ appointmentId: string; input: RescheduleInput }
	>(RESCHEDULE_APPOINTMENT);

	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const toastId = useId();
	const [selectedSlot, setSelectedSlot] = useState<Partial<SelectedSlot>>({});
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [newSchedule, setNewSchedule] = useState<Date>(currentAppointmentDate);

	const currentDate = new Date();
	const currentDayOfTheWeek = currentDate.getDay();

	const availability = mentor.availability || data?.viewMentor.availability;

	const selectedDayIndex = daysOfTheWeek.findIndex((day) => day.toLowerCase() === selectedDay.toLowerCase());

	const datesAreEqual = compareTimes(newSchedule, currentAppointmentDate);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!datesAreEqual)
			if (selectedDayIndex === -1) {
				console.error("Invalid selected day");
				return;
			}
		try {
			// Api Logic
			const { data } = await reschduleAppointment({
				variables: {
					appointmentId: appointment.id,
					input: {
						date: newSchedule,
						time: newSchedule.getTime().toString(),
					},
				},
			});
			if (data?.rescheduleAppointment) {
				if (user) {
					let appointments;
					if (user.is_mentor && user.mentor) appointments = user.mentor.appointments;
					else appointments = user.appointments;

					const appointmentToUpdateIndex = appointments.findIndex(
						(a) => a.id === data.rescheduleAppointment.id,
					);
					if (appointmentToUpdateIndex !== -1) {
						let updatedAppointments: IAppointment[] = [
							...user.appointments.slice(0, appointmentToUpdateIndex),
							data.rescheduleAppointment,
							...user.appointments.slice(appointmentToUpdateIndex + 1),
						];
						dispatch(updateUserProfile({ appointments: updatedAppointments }));
						toast.success("Appointment updated", { ...ToastDefaultOptions(), toastId });
						refetch();
						closeModal();
					} else toast.error("appointmentToUpdateIndex not found", { ...ToastDefaultOptions(), toastId });
				}
			}
		} catch (error) {
			console.error({ error: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong. Please try again", { toastId, ...ToastDefaultOptions() });
		}
	};

	useEffect(() => {
		const isAM = selectedSlot?.time?.startTime.slice(-2).toUpperCase() === "AM";
		const hour = parseInt(String(selectedSlot?.time?.startTime.split(":")[0]));
		const minutes = parseInt(String(selectedSlot?.time?.startTime.split(":")[1]));
		const currentHour = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours();

		const daysToAdd =
			currentDayOfTheWeek === selectedDayIndex && currentHour >= hour
				? 7
				: selectedDayIndex - currentDayOfTheWeek;

		const date = new Date(currentDate);
		date.setDate(date.getDate() + daysToAdd);
		date.setHours(isAM ? hour : hour + 12, minutes, 0);
		setNewSchedule(date);
	}, [selectedSlot, selectedDayIndex]);

	useEffect(() => {
		if (!appointment) {
			closeModal();
			return;
		}
	}, [appointment]);

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white h-auto w-[85vw] sm:w-[65vw] lg:w-[70vw] md:w-[75vw] rounded p-5 inline-block">
			<h1 className="font-medium">Reschedule Appoinment</h1>
			<div className="my-2 flex sm:flex-row flex-col sm:items-center justify-between gap-1 sm:gap-3 animate__animated animate__fadeIn text-[#094B10]">
				<p className="text-sm sm:w-[20%]">Current Schedule</p>
				<div
					className="sm:w-[80%] text-xs border border-[#70C5A1] p-2 capitalize sm:text-center flex-grow"
					style={{ fontFamily: "Days One" }}>
					{currentAppointmentDate?.toString()}
				</div>
			</div>

			{availabilityLoading ? (
				<ActivityIndicator />
			) : (
				<>
					{!selectedSlot.date && !selectedSlot.time && (
						<span className="text-sm text-[#9A9898]">
							Select a suitable {!selectedSlot.date ? "day" : "time"} to schedule a virtual meeting with
							this mentor:
						</span>
					)}

					{selectedSlot.date && selectedSlot.time && (
						<div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2 animate__animated animate__fadeIn text-[#094B10] ">
							<p className="text-sm sm:w-[20%]">New Schedule</p>
							<div
								className="sm:w-[80%] text-xs border border-[#70C5A1] p-2 capitalize sm:text-center flex-grow"
								style={{ fontFamily: "Days One" }}>
								{newSchedule.toString()}
							</div>
						</div>
					)}
					{datesAreEqual && (
						<p className="italic text-sm text-red-500 flex items-end justify-end my-2">
							The schedules are the same
						</p>
					)}
					{!selectedSlot?.date && (
						<div className="animate__animated animate__fadeIn">
							<div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-3 text-sm">
								{availability.map((slot, index) => {
									return (
										<span
											onClick={() => setSelectedDay(slot.day)}
											className={classNames("flex items-center gap-2 cursor-pointer")}
											key={index}>
											<input readOnly type="radio" checked={selectedDay == slot.day} />
											{slot.day}
										</span>
									);
								})}
							</div>
						</div>
					)}

					{selectedSlot.date && selectedSlot.date !== "" && !selectedSlot.time && (
						<div className="flex flex-col gap-3 my-6 animate__animated animate__fadeIn">
							{availability
								.find((d) => d.day == selectedSlot.date)
								?.timeSlots.map((slot, i) => {
									const hour = parseInt(slot.startTime.split(":")[0]);
									const endMinutes = parseInt(slot.startTime.split(":")[1]);
									const isAM = slot.startTime.slice(-2).toUpperCase() === "AM";
									const startTime = new Date();

									if (isAM && hour === 12) {
										startTime.setDate(currentDate.getDate() + 1);
										startTime.setHours(0, 0, 0);
									} else startTime.setHours(isAM ? hour : hour + 12, endMinutes, 0);

									// const slotExpired = isToday && currentDate >= startTime;
									const isBooked = !slot.isOpen;

									return (
										<span
											className={classNames(
												isBooked ? "cursor-disabled text-gray-300" : "",
												"flex items-center gap-2 cursor-pointer select-none sm:text-sm text-[13px]",
											)}
											key={i}
											onClick={() => {
												if (!isBooked)
													setSelectedSlot((p) => {
														return { ...p, time: slot };
													});
											}}>
											<input
												readOnly
												disabled={isBooked}
												type="radio"
												checked={selectedSlot?.time == slot}
											/>
											{slot.startTime} - {slot.endTime}
											{isBooked && (
												<span className="italic text-[#F6937B] grayscale-0">
													session booked
												</span>
											)}
										</span>
									);
								})}
						</div>
					)}
				</>
			)}

			<div className="flex gap-2 items-center justify-between sm:justify-start mt-3">
				{selectedSlot.date && (
					<PrimaryButton
						onClick={() => {
							if (selectedSlot.date && selectedSlot.time)
								setSelectedSlot((p) => {
									return { ...p, date: p.date, time: undefined };
								});
							else if (selectedSlot.date && !selectedSlot.time) setSelectedSlot({});
						}}
						disabled={loading}
						type="button"
						title={"Back"}
						className="text-sm p-1.5 px-8 rounded bg-[#FFB100] text-[#06310B]"
					/>
				)}

				{!selectedSlot.date && (
					<PrimaryButton
						disabled={!selectedDay || selectedDay == ""}
						onClick={() => {
							if (selectedDay && selectedDay !== "") setSelectedSlot({ date: selectedDay });
						}}
						type="button"
						title={"Continue"}
						className="text-sm p-1.5 px-8 rounded"
					/>
				)}

				{selectedSlot && selectedSlot?.date && selectedSlot?.time && (
					<div className="">
						<PrimaryButton
							onClick={handleSubmit}
							disabled={availabilityLoading || loading || datesAreEqual}
							title={!loading ? "Reschedule" : ""}
							icon={loading ? <ActivityIndicator /> : <></>}
							type="submit"
							className="capitalize p-1.5 px-4 rounded text-sm flex justify-center"
						/>
					</div>
				)}
			</div>
		</form>
	);
};

export default AppointmentRescheduleModal;

function compareTimes(date1: Date, date2: Date) {
	return (
		date1.getDate() == date2.getDate() &&
		date1.getHours() == date2.getHours() &&
		date1.getMinutes() === date2.getMinutes()
	);
}

type RescheduleInput = {
	date: Date;
	time: string;
};
