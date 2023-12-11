/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import allMentors from "../../../../../../data/mentors";
import { scrollUp } from "../../../../../../utils";
import MentorProfileCard from "../../../../atom/cards/mentor/MentorProfileCard";
import { IMentor } from "../../../../../../interfaces/mentor.interface";

const MentorsSection = () => {
	const [tab, setTab] = useState<"all" | "online">("all");
	const [loading, setLoading] = useState<boolean>(true);
	const [mentors, setMentors] = useState<IMentor[]>([]);

	const filteredMentors = useMemo(() => {
		return tab === "all"
			? mentors.map((mentor, index) => <MentorProfileCard mentor={mentor} key={index} />)
			: tab === "online" &&
					mentors
						.filter((mentor) => mentor.user.is_online)
						.map((mentor, index) => {
							return <MentorProfileCard mentor={mentor} key={index} />;
						});
	}, [mentors, tab]);

	const fetchMentors = () => {
		console.log("Fetching Mentors...");
		setLoading(true);
		setTimeout(function () {
			setMentors(allMentors);
			setLoading(false);
		}, 1200);
	};

	useEffect(() => {
		fetchMentors();
	}, [tab]);

	const switchTab = (active: typeof tab) => {
		if (tab !== active) {
			if (tab === "all") {
				setTab("online");
			} else {
				setTab("all");
			}
		}
		scrollUp(-800);
	};
	return (
		<>
			<div className="sticky h-20 top-[4em] z-10 bg-[#FDFDFD] flex justify-center items-center">
				<div className="flex items-center gap-10 animate__animated animate__fadeInUp">
					<button
						onClick={() => switchTab("all")}
						className={`overflow-hidden relative text-[#094B10] ${tab === "all" ? "font-semibold" : ""}`}>
						All
						<span
							className={`absolute bg-[#094B10] duration-300 left-0 bottom-0 h-[2px] ${
								tab === "all" ? "w-full" : "w-0"
							}`}
						/>
					</button>
					<button
						onClick={() => switchTab("online")}
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
				{loading
					? Array.from({ length: 3 }).map((_, ind) => {
							return <MentorProfileCard mentor={null} loading key={ind} />;
					  })
					: filteredMentors}
			</div>
		</>
	);
};

export default MentorsSection;
