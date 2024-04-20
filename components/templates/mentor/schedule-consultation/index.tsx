import React, { useEffect, useMemo, useState } from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { IMentor, TimeSlot } from "../../../../interfaces/mentor.interface";
import { daysOfTheWeek } from "../../../../constants";
import classNames from "classnames";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";
import { useSelector } from "react-redux";
import { QueryClient, useQuery } from "@tanstack/react-query";
import client from "../../../../utils/apolloClient";
import { VIEW_MENTOR_PROFILE } from "../../../../services/graphql/queries/mentor";
import { formatAmount, formatFollowersCount } from "../../../../utils";

type AvailabilitySubset = { id?: string; day: string; date: Date; timeSlots: TimeSlot[] };

const ScheduleConsultationTemplate = ({ loading, mentor }: { mentor?: IMentor; loading?: boolean }) => {
	const user = useSelector(currentUser);
	const availability = useMemo(() => mentor?.availability, [mentor]);
	const [selectedAvailability, setSelectedAvailability] = useState<AvailabilitySubset | null>(null);
	// const queryClient = useQuery({});
	// const fetchMentorProfile = async () => {
	// 	const { data } = await client().query<{ viewMentor: IMentor }, { viewMentorId: string }>({
	// 		query: VIEW_MENTOR_PROFILE,
	// 		variables: { viewMentorId: String(mentor?.id) },
	// 	});
	// 	if (data.viewMentor) return data.viewMentor;
	// };

	// useEffect(() => {
	// 	fetchMentorProfile();
	// }, []);

	// const [viewMentorProfile, { data, refetch }] = useLazyQuery<{ viewMentor: IMentor }, { viewMentorId: string }>(
	// 	VIEW_MENTOR_PROFILE,
	// 	{ variables: { viewMentorId: String(mentor?.id) } },
	// );

	// useEffect(() => {
	// 	if (data) mentor = data.viewMentor;
	// }, [viewMentorProfile, refetch]);

	// const appointment = useMemo(() => {
	// 	return user?.appointments.find(
	// 		(a) =>
	// 			a.mentor.id == mentor?.id &&
	// 			a.status !== AppointmentStatus.COMPLETED &&
	// 			a.status !== AppointmentStatus.CANCELLED_BY_USER &&
	// 			a.status !== AppointmentStatus.CANCELLED_BY_MENTOR,
	// 	);
	// }, [availability, user]);

	const mentorAvailability = () => {
		const slots = [];
		let availableDates: AvailabilitySubset[] = [];
		if (availability) {
			for (const slot of availability) {
				const { day, timeSlots, id } = slot;
				const date = new Date();
				const dayIndex = daysOfTheWeek.indexOf(day.toLowerCase());
				date.setDate(date.getDate() + ((dayIndex - date.getDay() + 7) % 7));
				const availableSlot = { id, day, date, timeSlots };
				availableDates.push(availableSlot);
			}
		}
		return { availableDates };
	};

	const { availableDates } = mentorAvailability();
	const handleSelect = (input: AvailabilitySubset) => {
		setSelectedAvailability(input);
	};
	return (
		<div className="py-10 h-full lg:px-20 sm:px-12 px-6 min-w-screen">
			<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			<div className="flex lg:flex-row flex-col justify-between gap-5 py-6 w-full md:mt-5 items-start animate__animated animate__fadeInUp overflow-hidden min-h-60">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white lg:w-[35%] w-full">
					<div className="flex justify-between items-center">
						<h1 className="font-medium">Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
					</div>
					<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
						{daysOfTheWeek.map((d, index) => {
							const mentorIsAvailable = Boolean(
								availability?.find((date) => date.day.toLowerCase() == d.toLowerCase()),
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
				<div className="flex-grow w-full lg:w-[35%]">
					<h1 className="text-[15px] font-medium">
						Book a 1:1 mentorship session with{" "}
						<span className="capitalize">{`${mentor?.user.name.split(" ")[0]} ${
							mentor?.user.name.split(" ")[1]
						}`}</span>
					</h1>
					<div className="w-full">
						<p className="my-3">Available dates</p>
						<div className="flex snap-x snap-mandatory items-center gap-3 min-h-[100px] w-full overflow-x-scroll hide-scroll-bar">
							{availableDates.map((slot, index) => {
								const { date, day, timeSlots } = slot;
								const remainingSlots = timeSlots.filter((slot) => slot.isOpen).length;
								return (
									<div
										key={index}
										onClick={() => handleSelect(slot)}
										className="snap-start select-none rounded border border-[#06310B] inline-block p-2 justify-center items-center h-24 w-full min-w-36 max-w-36 overflow-hidden cursor-pointer hover:bg-[#06310B] hover:text-white duration-300">
										<div className="grid gap-1 text-sm">
											<span className="capitalize text-[15px]">{day.slice(0, 3)}</span>
											<span className="font-medium">{date.getDate()}</span>
											<span className="text-zinc-400">
												{remainingSlots} slot
												{remainingSlots == 1 ? "" : "s"} available
											</span>
										</div>
										{/* <div className="">
										{timeSlots.map(({ endTime, isOpen, startTime }, i) => {
											return <span className="flex items-center">{}</span>;
										})}
									</div> */}
									</div>
								);
							})}
						</div>
					</div>
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
