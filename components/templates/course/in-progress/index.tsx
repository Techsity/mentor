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

const CourseInProgressTemplate = (course: ICourse) => {
	return (
		<>
			<div className="min-h-[50vh] h-full lg:px-16 sm:px-10 px-4">
				<div className="xl:min-h-[45dvh] lg:min-h-[40dvh]">
					<CourseInProgressTopHeader {...course} />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-5 w-full lg:items-start pb-20">
					<div className="relative w-full">
						<VideoComponent course={course} />
						<CourseOverviewTabComponent {...course} />
						<div className="flex items-center gap-5 mt-5 flex-wrap">
							<Link href="#">
								<p className="text-[red]">! Report Course</p>
							</Link>
							<Socials />
						</div>
					</div>
					<CourseContents inProgress course={course} />
				</div>
			</div>
		</>
	);
};

export default CourseInProgressTemplate;
