/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HeartOutline, ArrowForwardSharp } from "react-ionicons";
import { IMentor } from "../../../../../interfaces";
import Link from "next/link";

const MentorDisplayCard = ({ mentor }: { mentor: IMentor }) => {
	return (
		<div className="bg-white relative w-[300px] rounded md:w-[245px] h-[380px] lg:w-[300px] tracking-tight duration-300 group hover:shadow-lg overflow-hidden cursor-default">
			<div className="absolute w-full h-full bg-[rgba(0,0,0,0.35)] animate__animated animate__fadeIn hidden group-hover:block" />
			<div className="flex justify-center">
				<div className="grid py-10 px-5 gap-3">
					<img
						src={mentor.avatar || "/assets/images/avatar.png"}
						className="w-24 rounded-full"
						alt={mentor.name}
					/>
					<h1 className="text-xl mt-10">{mentor.name}</h1>
					<p className="text-sm text-[#B1B1B1] max-w-[15em]">{mentor.jobTitle}</p>
					<p className="text-sm text-[#B1B1B1]">
						{mentor.experience} years experience
					</p>
				</div>
			</div>
			<div className="hidden oveflow-hidden z-10 group-hover:md:grid absolute bg-[#042608] animate__animated animate__bounceInRight animate__faster text-white h-full px-4 w-1/2 right-0 top-0">
				<div className="relative">
					<ul className="">
						<h1 className="my-2 mt-4 text-lg font-medium">Skills</h1>
						{mentor.skills
							.map((skill, i) => (
								<li key={i} className="text-[15px]">
									{skill}
								</li>
							))
							.slice(0, 5)}
						{/* <span className="text-[15px] text-zinc-400">...and some more</span> */}
					</ul>
					<h1 className="my-2 mt-4 text-lg font-medium">Days Open</h1>
					{/* {mentor.daysOpen.length >= 7 ? (
						<span className="text-[15px]">Sun - Sat</span>
					) : (
						<ul className="grid grid-cols-2">
							{mentor.daysOpen.map((day, i) => (
								<li key={i} className="text-[15px]">
									{day}
								</li>
							))}
						</ul>
					)} */}
					<ul className="grid grid-cols-2">
						{mentor.daysOpen.map((day, i) => (
							<li key={i} className="text-[15px]">
								{day}
							</li>
						))}
					</ul>
				</div>
				<div className="absolute bottom-4 w-full left-4 flex items-center gap-2 select-none animate__animated animate__fadeInUp">
					<Link href="#">
						<div className="bg-[#094B10] px-4 p-1 rounded cursor-pointer">
							Book me
						</div>
					</Link>
					<ArrowForwardSharp color="#fff" />
				</div>
			</div>
		</div>
	);
};

export default MentorDisplayCard;
