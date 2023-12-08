import React from "react";
import { formatDateDifference } from "../../../../../utils";
import classNames from "classnames";
import { IMentorExperience } from "../../../../../interfaces/mentor.interface";

const MentorExperienceCard = ({ experience, className }: { experience: IMentorExperience; className?: string }) => {
	return (
		<div className={classNames("border border-[#70C5A1] text-sm p-4 w-full", className)}>
			<div className="flex justify-between gap-6 items-center mb-4">
				<div className="">
					<h1 className="font-[500]">{experience.job_role}</h1>
					<p className="font-[300]">
						{experience.company} | {formatDateDifference(experience.from_year, experience.to_year)}
					</p>
				</div>
				<div className="flex justify-center items-center h-10 w-10 bg-[#E6E6E6] rounded-full overflow-hidden relative">
					<svg width="24" height="30" viewBox="0 0 24 30" fill="none" className="absolute bottom-0 w-full">
						<path
							d="M0 0H15V30L6 29L0 25.5V0Z"
							fill="#D9D9D9"
							className="animate__fadeInUp animate__infinite animate__slower"
						/>
						<path
							d="M15 8H24V26.7L18 29.5L15 30V8Z"
							fill="#D2D2D2"
							className="animate__fadeInUp animate__infinite animate__slow"
						/>
					</svg>
				</div>
			</div>
			{/* {experience.roles && experience.roles.length >= 1 && (
				<div className="mb-4">
					<span className="text-[#BEBEBE] text-xs">My Roles</span>
					<div className="my-2 grid">
						{experience.roles?.slice(0, 5).join(" | ")}
						{experience.role && experience.role}
					</div>
				</div>
			)}*/}
			{experience.description && (
				<div className="my-2">
					<span className="text-[#BEBEBE] text-xs">About the role</span>
					<div className="my-2 break-words">{experience.description}</div>
				</div>
			)}
			{/* {experience..length >= 1 && (
				<div className="flex sm:flex-col md:flex-row text-sm md:items-center items-start gap-3">
					<span className="text-[#BEBEBE] text-xs">Top Skills</span>
					{experience.topSkills.slice(0, 4).join(` | `)}
				</div>
			)} */}
		</div>
	);
};

export default MentorExperienceCard;
