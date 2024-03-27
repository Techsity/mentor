import React from "react";
import RegisteredMentorshipCard from "../../../atom/cards/profile/RegisteredMentorshipCard";
import mentors from "../../../../../data/mentors";
import { AppointmentStatus, IMentorshipSession } from "../../../../../interfaces/mentor.interface";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";

const RegisteredMentorships = () => {
	const user = useSelector(currentUser);

	const pendingSessions = user?.appointments.filter((session) => session.status === AppointmentStatus.PENDING);
	const acceptedSessions = user?.appointments.filter((session) => session.status === AppointmentStatus.ACCEPTED);
	const concludedSessions = user?.appointments.filter((session) => session.status === AppointmentStatus.COMPLETED);
	const cancelledSessions = user?.appointments.filter((session) => session.status === AppointmentStatus.CANCELED);
	const declinedSessions = user?.appointments.filter((session) => session.status === AppointmentStatus.DECLINED);


	return (
		<div className="flex flex-col gap-12 overflow-hidden pb-10">
			{pendingSessions && pendingSessions.length > 0 && (
				<div className="">
					<h1 className="text-[#A3A6A7] font-medium mb-5">To be Accepted</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
						{pendingSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			)}

			{concludedSessions && concludedSessions.length > 0 && (
				<div className="">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Upcoming</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
						{concludedSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			)}

			{acceptedSessions && acceptedSessions.length > 0 && (
				<div className="">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Accepted</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
						{acceptedSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			)}

			{cancelledSessions && cancelledSessions.length > 0 && (
				<div className="">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Cancelled</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
						{cancelledSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			)}

			{declinedSessions && declinedSessions.length > 0 && (
				<div className="">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Cancelled</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
						{declinedSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default RegisteredMentorships;
