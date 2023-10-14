import React from "react";
import { ICourse } from "../../../../../interfaces";
import { AnimationOnScroll } from "react-animation-on-scroll";
import MentorProfileCard from "../../../atom/cards/mentor/MentorProfileCard";
import {
	Skills,
	Experience,
	Projects,
	FeaturedReviews,
	Socials,
} from "../../mentor/details";

const CourseDetailsBody = (course: ICourse) => {
	const CourseContentDropdown = () => {
		return (
			<div className=" p-4 border border-[#70C5A1]">
				<div className="">sdfgfdw</div>
			</div>
		);
	};
	return (
		<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-6">
			<div className="flex flex-col xl:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow xl:min-h-screen overflow-hidden">
					<AnimationOnScroll
						animateIn="animate__slideInUp"
						animateOnce>
						<div className="">
							<h1 className="font-semibold text-xl">
								About Course
							</h1>
							<p className="text-zinc-300 text-sm tracking-tight">
								This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python{" "}
							</p>
						</div>
					</AnimationOnScroll>
					<div className=""></div>
					<div className=""></div>
					<div className=""></div>
				</div>
				<div className="xl:max-w-[35%] w-full bg-[#fff] p-8 xl:min-h-[85vh] text-black border-2 border-[#70C5A1] sticky top-28 overflow-y-auto  animate__animated animate__slideInRight">
					<div className="flex items-center justify-between">
						<h1 className="font-semibold text-xl">
							Courses Contents
						</h1>
						<div className="p-2 px-8 border border-[#70C5A1] text-[#70C5A1] hover:bg-[#70C5A1] duration-300 hover:text-white select-none cursor-pointer">
							Free
						</div>
					</div>
					<div className="my-6 grid gap-4">
						{course.content.map((content, index) => (
							<CourseContentDropdown key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailsBody;
