/* eslint-disable @next/next/no-img-element */
import React from "react";
import mentors from "../../../../../../data/mentors";
import { IMentor } from "../../../../../../interfaces";

const MentorsSection = () => {
	const MentorDisplayCard = (mentor: IMentor) => {
		return (
			<div className="border bg-white border-[#70C5A1] p-5 w-full">
				<div className="grid grid-cols-2 divide-x-4 divide-[#D9D9D9]">
					<div className="pr-5 flex gap-4 items-center">
						<div className="relative">
							<img
								src={mentor.avatar || "/assets/images/avatar.png"}
								alt=""
								className="w-24 h-24 rounded-full"
							/>
							<span
								className={`absolute ${
									mentor.online ? "bg-[#00AD74]" : "bg-[#F6937B]"
								} h-5 w-5 border-white border-2 top-0 left-2 rounded-full`}
							></span>
						</div>
						<div className=""></div>
					</div>
					<div className="pl-5">{mentor.name}</div>
				</div>
			</div>
		);
	};
	return (
		<>
			<div className="grid gap-3 animate__animated animate__fadeIn lg:px-20 sm:px-10 px-6 md:p-10 bg-[#FDFDFD] md:border border-[#D0D0D0] overflow-hidden md:mx-10 mx-5 my-5">
				{mentors.map((mentor, index) => (
					<MentorDisplayCard {...mentor} key={index} />
				))}
			</div>
		</>
	);
};

export default MentorsSection;
