import React, { useMemo, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { IMentor, IMentorAvailability, TimeSlot } from "../../../../interfaces/mentor.interface";
import { daysOfTheWeek } from "../../../../constants";
import classNames from "classnames";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { CalendarOutline, TimeOutline } from "react-ionicons";

type AvailabilitySubset = { id?: string; day: string; date: Date; timeSlots: TimeSlot[] };
type SelectedAppointmentSlot = Omit<AvailabilitySubset, "timeSlots"> & { timeSlot: TimeSlot };
const currentDate = new Date();

const sortMentorAvailability = (availability: IMentorAvailability[]) => {
	let availableDates: AvailabilitySubset[] = [];
	if (availability) {
		for (const slot of availability) {
			const { day, timeSlots, id } = slot;
			let date = new Date();
			const dayIndex = daysOfTheWeek.indexOf(day.toLowerCase());
			date.setDate(date.getDate() + ((dayIndex - date.getDay()) % 7));
			// + 7
			if (date.getDay() > currentDate.getDay()) {
				const availableSlot = { id, day, date, timeSlots: timeSlots.filter((slot) => slot.isOpen) };
				availableDates.push(availableSlot);
			}
		}
	}
	return { availableDates };
};

const ScheduleConsultationTemplate = ({ loading, mentor }: { mentor?: IMentor; loading?: boolean }) => {
	const user = useSelector(currentUser);

	const { availableDates } = useMemo(
		() => sortMentorAvailability([...(mentor?.availability || [])]),
		[mentor?.availability],
	);
	const [selectedAvailability, setSelectedAvailability] = useState<AvailabilitySubset | null>(availableDates[0]);
	const [selectedAppointmentSlot, setSelectedAppointmentSlot] = useState<SelectedAppointmentSlot | null>(null);

	const handleSelect = (input: AvailabilitySubset) => {
		if (input.id !== selectedAvailability?.id) {
			setSelectedAvailability(input);
			// setSelectedAppointmentSlot({ ...input, timeSlot: input.timeSlots[0] });
			setSelectedAppointmentSlot(null);
		}
	};
	const handleSubmit = async () => {
		const { timeSlot, day, id, ...rest } = selectedAppointmentSlot || {};
		const appointment = { id, day, timeSlot };
		console.log({ appointment });
	};

	return (
		<div className="py-10 h-full lg:px-20 sm:px-12 px-6 min-w-screen">
			<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			<div className="lg:flex justify-between gap-5 py-6 w-full md:mt-5 items-start animate__animated animate__fadeInUp overflow-hidden lg:min-h-60">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white lg:w-[35%] w-full">
					<div className="flex justify-between items-center">
						<h1 className="font-medium">Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
					</div>
					<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
						{daysOfTheWeek.map((d, index) => {
							const mentorIsAvailable = Boolean(
								mentor?.availability?.find((date) => date.day.toLowerCase() == d.toLowerCase()),
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
				<div className="flex-grow w-full lg:w-[35%] mt-10 lg:mt-0">
					<h1 className="text-[15px] font-medium">
						Select a convenient date and time for a 1:1 mentorship session with{" "}
						<span className="capitalize">
							{Number(mentor?.user?.name?.split(" ").length) > 1
								? `${mentor?.user.name.split(" ")[0]} ${mentor?.user.name.split(" ")[1]}`
								: mentor?.user.name}
						</span>
					</h1>
					<div className="w-full">
						<div className="w-full mt-4">
							<p className="my-1 text-sm">Available dates</p>
							<div className="flex items-center gap-3 w-full overflow-x-scroll hide-scroll-bar">
								{availableDates.map((slot, index) => {
									let { date, day, timeSlots } = slot;
									const remainingSlots = timeSlots.filter((slot) => slot.isOpen).length;
									const month = date.toDateString().split(" ")[1];
									return (
										<div
											key={index}
											onClick={() => handleSelect(slot)}
											className={classNames(
												"select-none rounded border border-[#70C5A1] inline-flex p-2 justify-between items-start h-20 w-full min-w-36 max-w-36 overflow-hidden cursor-pointer duration-300",
												selectedAvailability?.id === slot.id
													? "bg-[#70C5A1] text-white"
													: "hover:bg-[#70C5A1]/10",
											)}>
											<div className="grid text-sm">
												<span className="capitalize text-[15px]">{day.slice(0, 3)}</span>
												<div className="space-x-1 font-medium text-[16.5px]">
													<span className="">{date.getDate()}</span>
													<span className="">{month}</span>
												</div>
												<span className="opacity-40">
													{remainingSlots} slot
													{remainingSlots == 1 ? "" : "s"}
													{/* available */}
												</span>
											</div>
											<CalendarOutline
												color={selectedAvailability?.id === slot.id ? "#fff" : "#000"}
												width={"18px"}
												height="18px"
											/>
										</div>
									);
								})}
							</div>
							{selectedAvailability && (
								<div className="w-full mt-4">
									<p className="my-1 text-sm">Available Slots</p>
									<div className="flex snap-x duration-300 snap-mandatory items-center gap-3 w-full overflow-x-scroll hide-scroll-bar">
										{selectedAvailability.timeSlots.length >= 1 ? (
											selectedAvailability.timeSlots
												.filter(
													(slot, index, self) =>
														index ===
														self.findIndex(
															(s) =>
																s.startTime === slot.startTime &&
																s.endTime === slot.endTime,
														),
												)
												.map((slot, index) => {
													const { endTime, startTime } = slot;
													const isTime =
														selectedAppointmentSlot?.timeSlot?.endTime === endTime &&
														selectedAppointmentSlot?.timeSlot?.startTime === startTime;
													return (
														<div
															onClick={() =>
																setSelectedAppointmentSlot({
																	...selectedAvailability,
																	timeSlot: slot,
																})
															}
															key={index}
															className={classNames(
																"select-none rounded border inline-flex justify-center gap-2 items-center p-2 min-w-28 w-full max-w-28 overflow-hidden cursor-pointer duration-300 text-sm",
																isTime
																	? "bg-[#FFB100] border-[#FFB100] text-[#06310B]"
																	: "hover:bg-[#FFB100]/10 border-[#06310B]",
															)}>
															<TimeOutline
																color={isTime ? "#06310B" : "#000"}
																width={"16px"}
																height="16px"
															/>
															<span>{startTime}</span>
														</div>
													);
												})
										) : (
											<>
												<p className="text-sm">No available slots</p>
											</>
										)}
									</div>
									<PrimaryButton
										// title="Continue"
										onClick={handleSubmit}
										title="Book a free trial"
										disabled={selectedAppointmentSlot === null}
										className="my-5 p-2.5 text-sm rounded px-5 flex justify-center items-center animate__animated animate__fadeIn animate__fast"
									/>
								</div>
							)}
						</div>
					</div>
					<br />
					<p className="max-w-sm text-[15px]">
						Schedules are inconvenient for you?
						<br />
						<span className="text-[#70C5A1] cursor-pointer hover:underline font-medium">
							Schedule a private appointment
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ScheduleConsultationTemplate;

// Todo:
{
	/* <div className="grid gap-1 flex-grow w-full lg:w-[35%]">
					{appointment ? (
						<ExistingAppointment existingAppointment={appointment} refetch={refetch} />
					) : (
						<NewAppointment mentor={mentor as IMentor} refetch={refetch} />
					)}
				</div> */
}
