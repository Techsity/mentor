import React from "react";
import { IMentor } from "../../../../interfaces";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import MentorExperienceCard from "../../../ui/atom/cards/mentor/MentorExperienceCard";

const MentorDetailsTemplate = (mentor: IMentor) => {
	const {
		about,
		avatar,
		country,
		courses,
		daysOpen,
		experience,
		followers,
		jobTitle,
		languages,
		skills,
	} = mentor;

	return (
		<div className="min-h-screen pt-20 h-full lg:px-20 sm:px-16 px-8 pb-40">
			<div className="">
				<MentorProfileCard mentor={mentor} detailsPage />
			</div>

			<div className="flex flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow">
					<div className="grid gap-3">
						<h1 className="text-lg font-semibold">Top Skills</h1>
						<span className="flex items-center flex-wrap gap-3 text-sm">
							{skills.map((skill) => (
								<span key={skill} className="font-[400] text-[#70C5A1]">
									{skill}
								</span>
							))}
						</span>
					</div>
					<div className="grid gap-3 mt-5">
						<h1 className="text-lg font-semibold">Experience</h1>
						<span className="flex items-center flex-wrap gap-3 text-sm">
							{experience.map((experience, index) => (
								<MentorExperienceCard {...experience} key={index} />
							))}
						</span>
					</div>
				</div>
				<div className="lg:max-w-[35%] w-full bg-[#06310B] p-8 min-h-[85vh] text-white sticky top-28 overflow-y-auto">
					<h1 className="font-medium">My Availability</h1>
					<p className="text-[#CEFFEA] font-[300] mt-2">Lagos (GMT +1)</p>
					<div className="grid gap-6 mt-10">
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Mondays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Tuesdays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Wednesdays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Thursdays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Fridays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Saturdays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
						<div className="flex justify-between w-full items-center">
							<h1 className="font-medium">Sundays</h1>
							<p className="font-[300]">10am - 5pm</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MentorDetailsTemplate;
