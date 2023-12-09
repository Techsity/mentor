/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IMentorshipSession } from "../../../../../interfaces/mentor.interface";

const RegisteredMentorshipCard = (session: IMentorshipSession) => {
	const SessionIndicator = () => {
		return session.pending ? (
			<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center gap-3 p-5 justify-start">
				<p className="">{session.date.toLocaleDateString()}</p>
				<p className="">||</p>
				<p className="">{session.date.toLocaleDateString()}</p>
			</div>
		) : session.upcoming ? (
			<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center gap-3 p-5 justify-start">
				<p className="">{session.date.toLocaleDateString()}</p>
			</div>
		) : session.concluded ? (
			<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center gap-3 p-5 justify-start">
				<p className="">Get Recording</p>
			</div>
		) : (
			<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center gap-3 p-5 justify-start">
				<p className="">{session.date.toLocaleDateString()}</p>
				<p className="">||</p>
				<p className="">{session.date.toLocaleDateString()}</p>
			</div>
		);
	};

	return (
		<>
			<div className="flex flex-col gap-5 bg-white shadow hover:shadow-lg h-[150px] cursor-pointer select-none duration-300">
				<SessionIndicator />
				<div className="flex items-center gap-3 p-2">
					<div className="">
						<img
							src={session.mentor.user.avatar || "/assets/images/avatar.png"}
							alt={session.mentor.user.name}
							className="text-sm rounded-full h-14 w-14"
						/>
					</div>
					<div className="">
						<h1 className="font-semibold text-black">{session.mentor.user.name}</h1>
						<p className="text-sm text-[#B1B1B1]">{session.mentor.role}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisteredMentorshipCard;
