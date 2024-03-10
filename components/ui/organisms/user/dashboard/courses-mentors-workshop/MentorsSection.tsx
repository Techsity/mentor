/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import { scrollUp } from "../../../../../../utils";
import MentorProfileCard from "../../../../atom/cards/mentor/MentorProfileCard";
import { IMentor } from "../../../../../../interfaces/mentor.interface";
import { useQuery } from "@apollo/client";
import { GET_ALL_MENTORS } from "../../../../../../services/graphql/mutations/mentors";

const MentorsSection = () => {
	const [tab, setTab] = useState<"all" | "online">("all");
	const { data, loading, error, refetch } = useQuery<{ viewAllMentors: IMentor[] }>(GET_ALL_MENTORS);
	const mentors = data?.viewAllMentors;

	const mentorsOnline = mentors?.filter((mentor) => mentor.user.is_online);

	const filteredMentors = useMemo(() => {
		return tab === "all" ? (
			mentors?.map((mentor, index) => <MentorProfileCard mentor={mentor} key={index} />)
		) : tab === "online" && Number(mentorsOnline?.length) < 1 ? (
			<div>No Mentors online at the moment. Check again later.</div>
		) : (
			mentorsOnline?.map((mentor, index) => {
				return <MentorProfileCard mentor={mentor} key={index} />;
			})
		);
	}, [mentors, tab, loading, data, refetch]);

	const switchTab = (active: typeof tab) => {
		if (tab !== active) {
			refetch();
			if (tab === "all") setTab("online");
			else setTab("all");
		}
		scrollUp(-800);
	};

	if (!loading && error) {
		console.error({ error: JSON.stringify(error) });
		return (
			<div className="text-red-600 text-xl h-screen flex justify-center items-center">
				Network error. Please refresh page and try again.
			</div>
		);
	}

	return (
		<>
			<div className="sticky h-20 top-[4em] z-10 bg-[#FDFDFD] flex justify-center items-center">
				<div className="flex items-center gap-10 animate__animated animate__fadeInUp relative z-30">
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
							return <MentorProfileCard mentor={null} loading key={ind} onFollow={() => refetch()} />;
					  })
					: filteredMentors}
			</div>
		</>
	);
};

export default MentorsSection;
