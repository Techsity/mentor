/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import mentors from "../../../../../../data/mentors";
import { scrollUp } from "../../../../../../utils";
import { useRouter } from "next/router";
import MentorProfileCard from "../../../../atom/cards/mentor/MentorProfileCard";

const MentorsSection = () => {
	const [tab, setTab] = useState<"all" | "online">("all");
	const router = useRouter();

	return (
		<>
			<div className="sticky h-20 top-40 z-10 bg-[#FDFDFD] flex justify-center items-center">
				<div className="flex items-center gap-10 animate__animated animate__fadeInUp">
					<button
						onClick={() => {
							setTab("all");
							scrollUp();
						}}
						className={`overflow-hidden relative text-[#094B10] ${
							tab === "all" ? "font-semibold" : ""
						}`}>
						All
						<span
							className={`absolute bg-[#094B10] duration-300 left-0 bottom-0 h-[2px] ${
								tab === "all" ? "w-full" : "w-0"
							}`}
						/>
					</button>
					<button
						onClick={() => {
							setTab("online");
							scrollUp();
						}}
						className={`overflow-hidden relative text-[#094B10] ${
							tab === "online" ? "font-semibold" : ""
						}`}>
						Online
						<span
							className={`absolute bg-[#094B10] duration-300 left-0 bottom-0 h-[2px] ${
								tab === "online" ? "w-full" : "w-0"
							}`}
						/>
					</button>
				</div>
			</div>
			<div className="grid xs:gap-3 gap-5 lg:px-20 sm:px-10 px-auto md:p-10 bg-[#FDFDFD] md:border border-[#D0D0D0] overflow-hidden md:mx-10 mx-5 my-5">
				{tab === "all"
					? mentors.map((mentor, index) => (
							<MentorProfileCard mentor={mentor} key={index} />
					  ))
					: tab === "online"
					? mentors
							.filter((mentor) => mentor.online)
							.map((mentor, index) => (
								<MentorProfileCard
									mentor={mentor}
									key={index}
								/>
							))
					: mentors.map((mentor, index) => (
							<MentorProfileCard mentor={mentor} key={index} />
					  ))}
			</div>
		</>
	);
};

export default MentorsSection;
