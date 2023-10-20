/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import CourseInProgressTopHeader from "../../../ui/organisms/course-in-progress/CourseInProgressTopHeader";
import CourseContents from "../../../ui/organisms/course-details/body/CourseContents";
import VideoComponent from "../../../ui/organisms/course-in-progress/video/VideoComponent";

const CourseInProgressTemplate = (course: ICourse) => {
	return (
		<>
			<div className="min-h-[50vh] h-full lg:px-16 sm:px-10 px-4">
				<div className="xl:min-h-[45dvh] lg:min-h-[40dvh]">
					<CourseInProgressTopHeader {...course} />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-5 w-full lg:items-start pb-20">
					<VideoComponent {...course} />
					<CourseContents inProgress course={course} className="" />
				</div>
			</div>
		</>
	);
};

export default CourseInProgressTemplate;
