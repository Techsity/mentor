/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { IMentor } from "../../../../interfaces/mentor.interface";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { AvailabiltySchedule, Experience, MentorProjects, Skills } from "../../../ui/organisms/mentor/details/";
import { getMentorCourses } from "../../../../services/api";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import { AnimationOnScroll } from "react-animation-on-scroll";
import ListReviews from "../../../ui/atom/common/course/ListReviews";
import Socials from "../../../ui/atom/common/course/Socials";
import OtherCoursesByMentor from "../../../ui/organisms/course/course-details/other-courses-by-mentor";

const MentorDetailsTemplate = (mentor: IMentor) => {
	const coursesByMentor = getMentorCourses(mentor.user.name);

	return (
		<>
			<div className="min-h-screen pt-5 h-full">
				<div className=" animate__animated animate__slideInDown lg:px-20 sm:px-12 px-6">
					<MentorProfileCard mentor={mentor} detailsPage />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-5 py-6 w-full mt-10 items-start lg:px-20 sm:px-12 px-6">
					<div className="flex-grow min-h-screen overflow-hidden">
						<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
							<Skills skills={mentor.skills} />
						</AnimationOnScroll>
						<Experience experience={mentor.work_experience} />
						<div className="my-5 lg:max-w-xl">
							<MentorProjects projects={mentor.projects} />
						</div>
						<ListReviews />
						<div className="flex max-w-xl justify-between items-center mt-5">
							<p className="text-[#F15E63] cursor-pointer hover:underline">! Report Mentor</p>
							<Socials />
						</div>
					</div>
					<AvailabiltySchedule {...mentor} />
				</div>
				{coursesByMentor?.length >= 1 && (
					<>
						<div className="border-t border-[#A3A6A7] mt-10 mx-20" />
						<OtherCoursesByMentor mentorProfile mentor={mentor} />
					</>
				)}
			</div>
			<div className="mt-24">
				<h1 className="text-center" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</div>
		</>
	);
};

export default MentorDetailsTemplate;
