import React from "react";
import MentorshipDisplayCard from "../../../atom/cards/profile/mentorship-display-card";
import mentors from "../../../../../data/mentors";
import { AppointmentStatus, IAppointment, IMentorshipSession } from "../../../../../interfaces/mentor.interface";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";

const RegisteredMentorships = () => {
	const user = useSelector(currentUser);

	const upcomingSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.UPCOMING)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.UPCOMING);

	const pendingSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.PENDING)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.PENDING);

	const acceptedSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.ACCEPTED)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.ACCEPTED);

	const concludedSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.COMPLETED)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.COMPLETED);

	const cancelledSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.CANCELLED_BY_USER)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.CANCELLED_BY_USER);

	const declinedSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.DECLINED)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.DECLINED);

	const overdueSessions = !user?.is_mentor
		? user?.appointments?.filter((session) => session.status === AppointmentStatus.OVERDUE)
		: user?.mentor?.appointments?.filter((session) => session.status === AppointmentStatus.OVERDUE);

	return (
		<div className="flex flex-col gap-12 overflow-hidden pb-10">
			{user &&
				(user?.appointments.length < 1 ? (
					<p className="text-sm">Nothing here 💨</p>
				) : (
					user.mentor && user?.mentor?.appointments.length < 1 && <p className="text-sm">Nothing here 💨</p>
				))}
			{upcomingSessions && upcomingSessions.length > 0 && (
				<ListSessions sessions={upcomingSessions} status={AppointmentStatus.UPCOMING} />
			)}
			{pendingSessions && pendingSessions.length > 0 && (
				<ListSessions sessions={pendingSessions} status={AppointmentStatus.PENDING} />
			)}
			{concludedSessions && concludedSessions.length > 0 && (
				<ListSessions sessions={concludedSessions} status={AppointmentStatus.COMPLETED} />
			)}
			{acceptedSessions && acceptedSessions.length > 0 && (
				<ListSessions sessions={acceptedSessions} status={AppointmentStatus.ACCEPTED} />
			)}
			{cancelledSessions && cancelledSessions.length > 0 && (
				<ListSessions sessions={cancelledSessions} status={AppointmentStatus.CANCELLED_BY_USER} />
			)}
			{declinedSessions && declinedSessions.length > 0 && (
				<ListSessions sessions={declinedSessions} status={AppointmentStatus.DECLINED} />
			)}
			{overdueSessions && overdueSessions.length > 0 && (
				<ListSessions sessions={overdueSessions} status={AppointmentStatus.OVERDUE} />
			)}
		</div>
	);
};

const ListSessions = ({ sessions, status }: { sessions: IAppointment[]; status: AppointmentStatus }) => {
	const user = useSelector(currentUser);
	return (
		<div className="">
			<h1 className="text-[#A3A6A7] font-medium mb-2 text-[14px] capitalize">
				{status === AppointmentStatus.PENDING && user?.is_mentor
					? "Waiting for approval"
					: status === AppointmentStatus.ACCEPTED
					? "scheduled sessions"
					: status.toLowerCase() + " sessions"}
			</h1>
			<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center">
				{sessions.map((session, i) => (
					<MentorshipDisplayCard {...session} key={i} />
				))}
			</div>
		</div>
	);
};

export default RegisteredMentorships;
