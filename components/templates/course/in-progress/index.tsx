/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import CourseInProgressTopHeader from "../../../ui/organisms/course-in-progress/CourseInProgressTopHeader";
import CourseContents from "../../../ui/organisms/course-details/body/CourseContents";

const CourseInProgressTemplate = (course: ICourse) => {
	return (
		<>
			<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-4">
				<div className="xl:min-h-[45dvh] md:min-h-[40dvh]">
					<CourseInProgressTopHeader {...course} />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-8 w-full items-start pb-20">
					<div className="flex-grow xl:min-h-screen relative xl:-top-24">
						<div className="lg:max-w-[50dvw]">
							{course.title} {course.title}
							{course.title} {course.title}
							{course.title} {course.title}
							{course.title} {course.title}
							{course.title} {course.title}
						</div>
					</div>
					<CourseContents inProgress course={course} className="" />
				</div>
			</div>
		</>
	);
};

export default CourseInProgressTemplate;
