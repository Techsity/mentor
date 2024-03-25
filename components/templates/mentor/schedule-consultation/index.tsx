import React, { ChangeEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CloseSharp } from "react-ionicons";
import { IMentor, IMentorAvailability, TimeSlot } from "../../../../interfaces/mentor.interface";
import { daysOfTheWeek, ToastDefaultOptions } from "../../../../constants";
import { slugify } from "../../../../utils";
import classNames from "classnames";
import { BOOK_MENTOR } from "../../../../services/graphql/mutations/user";
import { useMutation } from "@apollo/client";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { toast } from "react-toastify";

type CreateAppointmentInput = {};

const ScheduleConsultationTemplate = ({ loading, mentor }: { mentor?: IMentor; loading?: boolean }) => {
	const toastId = useId();
	const [selectedSlot, setSelectedSlot] = useState<Partial<SelectedSlot>>({});
	const [selectedDay, setSelectedDay] = useState<string>("");

	const [bookMentor, { loading: appointmentLoading }] = useMutation<
		any,
		{ createAppointmentInput: CreateAppointmentInput }
	>(BOOK_MENTOR);

	const currentDayOfTheWeek = new Date().getDay();

	const mentorAvailableDay = mentor?.availability.some(
		(date) => date.day.toLowerCase() === daysOfTheWeek[currentDayOfTheWeek].toLowerCase(),
	);

	// const handleSelectDay = () => {
	// && selectedSlot.date !== "" &&
	// };

	const handleSubmit = async () => {
		const date = new Date();

		// const index = daysOfTheWeek.findIndex((d) => d.toLowerCase() == selectedSlot?.date.toLowerCase());
		// console.log({ date: daysOfTheWeek[index], index, day: daysOfTheWeek[currentDayOfTheWeek] });
		try {
			console.log({ selectedSlot });
			const { data } = await bookMentor({ variables: { createAppointmentInput: {} } });
			console.log({ res: data });
		} catch (error) {
			console.error({ error: JSON.stringify(error) });
			toast.error("Something went wrong. Please try again", { toastId, ...ToastDefaultOptions() });
		}
	};

	return (
		<div className="py-10 h-full lg:px-20 sm:px-12 px-6">
			<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			<div className="flex lg:flex-row flex-col justify-between gap-5 py-6 w-full md:mt-5 items-start animate__animated animate__fadeInUp overflow-hidden">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white lg:w-[45%] w-full">
					<div className="flex justify-between items-center">
						<h1 className="font-medium">Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
					</div>
					<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
						{daysOfTheWeek.map((d, index) => {
							const mentorIsAvailable = Boolean(
								mentor?.availability.find((date) => date.day.toLowerCase() == d.toLowerCase()),
							);
							return (
								<div
									key={index}
									className={classNames(
										!mentorIsAvailable ? "text-gray-500" : "text-white",
										"flex gap-6 text-sm sm:justify-start justify-between w-full items-center",
									)}>
									<h1 className="font-medium capitalize">{d}</h1>
									<p className="font-[300]">{mentorIsAvailable ? "Available" : "Unavailable"}</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="grid gap-1 flex-grow w-full lg:w-[35%]">
					{mentorAvailableDay ? (
						<>
							<>
								<span className="text-sm text-[#9A9898]">
									Select a suitable {!selectedSlot.date ? "day" : "time"} to schedule a virtual
									meeting with this mentor;
								</span>
								{selectedSlot.date && selectedSlot.time && (
									<div className="flex sm:flex-row flex-col items-center justify-between gap-2 animate__animated animate__fadeIn">
										<div className="border border-[#70C5A1] p-3 w-full capitalize text-center">
											{selectedSlot.date}
										</div>
										<div className="border border-[#70C5A1] p-3 w-full text-center">
											{selectedSlot.time.startTime} - {selectedSlot.time.endTime}
										</div>
									</div>
								)}
								{!selectedSlot?.date && (
									<div className="animate__animated animate__fadeIn">
										<div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
											{mentor?.availability.map((slot, index) => {
												return (
													<span
														onClick={() => setSelectedDay(slot.day)}
														className="flex items-center gap-2 cursor-pointer"
														key={index}>
														<input
															readOnly
															type="radio"
															checked={selectedDay == slot.day}
														/>
														{slot.day}
													</span>
												);
											})}
										</div>
									</div>
								)}
								{/* selectedSlot.date !== "" && */}
								{selectedSlot.date && selectedSlot.date !== "" && !selectedSlot.time && (
									<div className="flex flex-col gap-2 mt-3 animate__animated animate__fadeIn">
										{mentor?.availability
											.find((d) => d.day == selectedSlot.date)
											?.timeSlots.map((slot, i) => {
												const endHour = parseInt(slot.endTime.split(":")[0]);
												const endMinutes = parseInt(slot.endTime.split(":")[1]);
												const isAM = slot.endTime.slice(-2).toUpperCase() === "AM";
												const currentTime = new Date();
												const endTime = new Date();

												if (isAM && endHour === 12) {
													endTime.setDate(currentTime.getDate() + 1);
													endTime.setHours(0, 0, 0);
												} else endTime.setHours(isAM ? endHour : endHour + 12, endMinutes, 0);

												const slotExpired = currentTime >= endTime;
												const isBooked = !slotExpired && !slot.isOpen;

												return (
													<span
														className={classNames(
															slotExpired || isBooked
																? "cursor-disabled text-gray-300"
																: "",
															"flex items-center gap-2 cursor-pointer select-none",
														)}
														key={i}
														onClick={() => {
															if (!slotExpired && !isBooked)
																setSelectedSlot((p) => {
																	return { ...p, time: slot };
																});
														}}>
														<input
															readOnly
															disabled={slotExpired || isBooked}
															type="radio"
															checked={selectedSlot?.time == slot}
														/>
														{slot.startTime} - {slot.endTime}
														{!slotExpired && isBooked && (
															<span className="text-sm italic text-[#F6937B] grayscale-0">
																session booked
															</span>
														)}
													</span>
												);
											})}
									</div>
								)}
							</>

							<div className="flex gap-2 items-center">
								{selectedSlot.date && (
									<PrimaryButton
										onClick={() => {
											if (selectedSlot.date && selectedSlot.time)
												setSelectedSlot((p) => {
													return { ...p, date: p.date, time: undefined };
												});
											else if (selectedSlot.date && !selectedSlot.time) {
												setSelectedSlot({});
											}
										}}
										title={"Back"}
										className="mt-4 p-2 px-8 rounded"
									/>
								)}
								{!selectedSlot.date && (
									<PrimaryButton
										onClick={() => {
											if (selectedDay && selectedDay !== "")
												setSelectedSlot((p) => {
													return { date: selectedDay };
												});
										}}
										title={"Continue"}
										className="mt-4 p-2 px-8 rounded"
									/>
								)}
								{selectedSlot && selectedSlot?.date && selectedSlot?.time && (
									<div className="mt-4">
										<PrimaryButton
											onClick={handleSubmit}
											disabled={appointmentLoading}
											title={!appointmentLoading ? "Continue" : ""}
											icon={appointmentLoading ? <ActivityIndicator /> : <></>}
											className="p-2 px-8 animate__animated animate__fadeIn rounded"
										/>
									</div>
								)}
							</div>
							<span className="text-[15px] mt-6">
								Schedules are inconvenient for you?
								<span className="text-[#06310B] cursor-pointer hover:underline font-medium">
									{" "}
									Schedule a private appointment
								</span>
							</span>
						</>
					) : (
						<p className="text-sm text-red-600">Sorry, this mentor is unavailable today.</p>
					)}
				</div>
			</div>
		</div>
	);
};

type SelectedSlot = { date: string; time: TimeSlot };
export default ScheduleConsultationTemplate;
