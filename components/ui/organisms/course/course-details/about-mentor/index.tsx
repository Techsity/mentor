/* eslint-disable @next/next/no-img-element */
import React from "react";
import { formatFollowersCount } from "../../../../../../utils";
import { IMentor } from "../../../../../../interfaces/mentor.interface";

const CoursePageAboutMentor = (mentor: IMentor) => {
	return (
		<div className="px-5 sm:px-10 lg:px-20 mt-10 py-3">
			<h1 className="text-xl font-semibold">About Mentor</h1>
			<div className="mt-8">
				<div className="my-2 sm:my-4 flex items-center gap-2">
					<div className="flex gap-1.5 items-center">
						<img
							src={mentor.user.avatar || "/assets/images/avatar.png"}
							className="rounded-full w-20"
							alt={mentor.user.name}
						/>
					</div>
					<div className="grid items-center max-w-sm font-[300] text-sm gap-1">
						<div className="flex item-center gap-2">
							<h1 className="font-semibold text-lg text-[#094B10]">{mentor.user.name}</h1>
							{mentor.mentor_verified ? (
								<svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-1.5">
									<path
										d="M6.29757 11L4 8.60232L5.04704 7.50965L6.29757 8.81853L9.95296 5L11 6.09266L6.29757 11Z"
										fill="#0CF27E"
									/>
									<rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#70C5A1" />
								</svg>
							) : null}
							<p className="flex items-center">{formatFollowersCount(mentor.followers.length)} followers</p>
							<p className="flex gap-2 items-center text-[#70C5A1] select-none cursor-pointer">+follow</p>
						</div>
						<p className="">{mentor.role} </p>
						<p className="flex gap-1 items-center">
							{/* {formatFollowersCount(mentor.courses.length)}{" "} */}
							{formatFollowersCount(mentor.courses.length)} Courses | {formatFollowersCount(31)} Sessions
							{/* |{" "} */}
							{/* {formatFollowersCount(mentor.mentees.length)} Mentee */}|{" "}
							{formatFollowersCount(mentor.followers.length)} Followers
						</p>
					</div>
				</div>
				<div className="text-[#9A9898] text-sm max-w-2xl">{mentor.about}</div>
			</div>
		</div>
	);
};

export default CoursePageAboutMentor;
