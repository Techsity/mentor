/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import CourseInProgressTopHeader from "../../../ui/organisms/course-in-progress/CourseInProgressTopHeader";
import CourseContents from "../../../ui/organisms/course/course-details/body/CourseContents";
import VideoComponent from "../../../ui/organisms/course-in-progress/video/VideoComponent";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import Socials from "../../../ui/atom/common/course/Socials";
import Link from "next/link";
import CourseOverview from "../../../ui/organisms/course-in-progress/overview-tab/CourseOverview";
import CourseOverviewTab from "../../../ui/organisms/course-in-progress/overview-tab";

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
						<CourseOverviewTab {...course} />
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
