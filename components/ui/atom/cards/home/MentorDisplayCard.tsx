/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HeartOutline, ArrowForwardSharp, StarSharp } from "react-ionicons";
import Link from "next/link";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import { calculateOverallExperience, calculateRatingsInReviews, formatFollowersCount } from "../../../../../utils";
import { useRouter } from "next/router";

const MentorDisplayCard = ({ mentor }: { mentor: IMentor }) => {
	const router = useRouter();
	const ratings = mentor.reviews ? calculateRatingsInReviews(mentor.reviews) : 0;
	const overallExperience = calculateOverallExperience(mentor.work_experience);
	const followers = formatFollowersCount(mentor.followers.length);
	return (
		<div className="inline-block px-3 animate__animated animate__fadeIn snap-start group mx-auto">
			<div className="bg-white relative w-[310px] md:w-[285px] lg:w-[300px] h-auto rounded tracking-tight duration-300 group hover:shadow-lg overflow-hidden cursor-default">
				<div className="absolute w-full h-full bg-[rgba(0,0,0,0.35)] animate__animated animate__fadeIn hidden group-hover:md:block" />
				<div className="flex justify-center sm:p-0 sm:pl-5 w-full mx-auto">
					<div className="grid py-6 sm:py-10 sm:px-5 gap-2">
						<div className="flex sm:justify-center w-full">
							<img
								src={mentor.user.avatar || "/assets/images/avatar.png"}
								className="w-24 rounded-full"
								alt={mentor.user.name}
								loading="lazy"
							/>
						</div>
						<h1 className="text-xl mt-6 font-medium capitalize">
							{mentor.user.name.split(" ").length > 1
								? mentor.user.name.split(" ")[0] + " " + mentor.user.name.split(" ")[1]
								: mentor.user.name}
						</h1>
						<p className="sm:text-sm text-[#B1B1B1] sm:max-w-[15em] capitalize">
							{mentor.role && mentor.role}
						</p>
						<p className="sm:text-sm text-[#B1B1B1]">
							{overallExperience === 1
								? overallExperience + " year"
								: overallExperience < 1
								? "<1 year"
								: overallExperience + " years"}{" "}
							of experience
						</p>
						{/* <p className="sm:text-sm text-[#B1B1B1] sm:max-w-[15em]">2 sessions</p> */}
						<p className="sm:text-sm text-[#B1B1B1] sm:max-w-[15em]">
							{parseInt(followers) === 1 ? followers + " follower" : followers + " followers"}
						</p>
						<span className="flex gap-1 items-center text-sm text-[#B1B1B1]">
							<svg width="16" height="16" viewBox="0 0 9 9" fill="none">
								<path
									d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
									fill="#FF5C00"
									fillOpacity="0.5"
								/>
							</svg>
							{Number(ratings).toFixed(1)}
						</span>
						<div className="md:hidden py-5">
							<div
								onClick={() => router.push(`/mentors/${mentor.id}`)}
								className="bg-[#094B10] text-center text-white px-4 p-1 rounded cursor-pointer">
								View Profile
							</div>
						</div>
					</div>
				</div>
				<div className="hidden oveflow-hidden z-10 group-hover:md:grid absolute bg-[#042608] text-white h-full px-4 w-1/2 right-0 top-0 animate__animated animate__fadeInRight animate__faster">
					<div className="relative">
						{mentor.skills && mentor.skills.length > 0 && (
							<ul className="">
								<h1 className="my-2 mt-4 font-normal text-sm">Top Skills</h1>
								{mentor.skills
									.map((skill, i) => (
										<li key={i} className="text-xs font-extralight">
											{skill.skill_name}
										</li>
									))
									.slice(0, 5)}
							</ul>
						)}
						<h1 className="my-2 mt-4 text-sm font-normal">Availablity</h1>
						<ul className="grid">
							{mentor.availability &&
								mentor.availability.map((day, i) => (
									<li key={i} className="text-xs font-extralight">
										{day.day}
									</li>
								))}
						</ul>
					</div>
					<div className="absolute bottom-4 w-full left-4 flex items-center gap-2 select-none">
						<div
							onClick={() => router.push(`/mentors/${mentor.id}`)}
							className="bg-[#094B10] px-4 p-1 text-xs cursor-pointer">
							View Profile
						</div>
						<ArrowForwardSharp color="#fff" width="20px" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MentorDisplayCard;
