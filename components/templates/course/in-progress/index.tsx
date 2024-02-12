/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import Link from "next/link";
import Socials from "../../../ui/atom/common/course/Socials";
import CourseContents from "../../../ui/organisms/course/course-details/body/CourseContents";
import CourseInProgressTopHeader from "../../../ui/organisms/course/course-in-progress/CourseInProgressTopHeader";
import VideoComponent from "../../../ui/organisms/course/course-in-progress/video/VideoComponent";
import CourseOverviewTabComponent from "../../../ui/organisms/course/course-in-progress/overview-tab";
import courses from "../../../../data/courses";

const CourseInProgressTemplate = () => {
	const course = courses[0];
	return (
		<div className="min-h-[50vh] h-full lg:px-16 sm:px-10 px-4 pb-20">
			<div className="">
				<CourseInProgressTopHeader {...course} />
			</div>
			<div className="flex flex-col lg:flex-row justify-between gap-5 w-full items-start">
				<div className="relative flex-grow">
					<VideoComponent course={course} />
					<CourseOverviewTabComponent {...course} />
					<div className="flex items-center gap-5 mt-5 flex-wrap">
						<Link href="#">
							<p className="text-[red]">! Report Course</p>
						</Link>
						<Socials />
					</div>
				</div>
				<CourseContents inProgress course={course} className="lg:max-w-[30%] xl:mt-6" />
			</div>
		</div>
	);
};

export default CourseInProgressTemplate;
