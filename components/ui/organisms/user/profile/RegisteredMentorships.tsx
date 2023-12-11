import React from "react";
import RegisteredMentorshipCard from "../../../atom/cards/profile/RegisteredMentorshipCard";
import mentors from "../../../../../data/mentors";
import { IMentorshipSession } from "../../../../../interfaces/mentor.interface";

const registeredMentorships: IMentorshipSession[] = [
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: false,
		pending: true,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: false,
		pending: true,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: false,
		pending: true,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		upcoming: true,
		concluded: false,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: true,
		upcoming: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		concluded: false,
		upcoming: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		upcoming: false,
		concluded: true,
		pending: false,
	},
	{
		date: new Date().toDateString(),
		mentor: mentors[0],
		upcoming: false,
		concluded: true,
		pending: false,
	},
];

const RegisteredMentorships = () => {
	const pendingSessions = registeredMentorships.filter(
		(session) => session.pending && !session.concluded && !session.upcoming,
	);
	const upcomingSessions = registeredMentorships.filter(
		(session) => session.upcoming && !session.pending && !session.concluded,
	);
	const concludedSessions = registeredMentorships.filter(
		(session) => session.concluded && !session.pending && !session.upcoming,
	);
	return (
		<div className="flex flex-col gap-12 overflow-hidden pb-10">
			{pendingSessions.length > 0 ? (
				<div className="animate__animated animate__slideInUp">
					<h1 className="text-[#A3A6A7] font-medium mb-5">To be Accepted</h1>
					<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center">
						{pendingSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			) : null}
			{upcomingSessions.length > 0 ? (
				<div className="animate__animated animate__slideInUp">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Upcoming</h1>
					<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center">
						{upcomingSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			) : null}
			{concludedSessions.length > 0 ? (
				<div className="animate__animated animate__slideInUp">
					<h1 className="text-[#A3A6A7] font-medium mb-5">Concluded</h1>
					<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center">
						{concludedSessions.map((session, i) => (
							<RegisteredMentorshipCard {...session} key={i} />
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default RegisteredMentorships;
