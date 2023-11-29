import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { ICourse } from "../../../../../../interfaces";

const AboutCourse = (course: ICourse) => {
	return (
		<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
			<div className="">
				<h1 className="font-semibold text-xl">About this Course</h1>
				<p className="text-zinc-400 font-[300] max-w-2xl py-4 text-[14px] sm:text-[15px]">
					{course.description}
				</p>
			</div>
		</AnimationOnScroll>
	);
};

export default AboutCourse;
