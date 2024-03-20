/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Socials from "../../../ui/atom/common/course/Socials";
import CourseContents from "../../../ui/organisms/course/course-details/body/CourseContents";
import CourseInProgressTopHeader from "../../../ui/organisms/course/course-in-progress/CourseInProgressTopHeader";
import VideoComponent from "../../../ui/organisms/course/course-in-progress/video/VideoComponent";
import CourseOverviewTabComponent from "../../../ui/organisms/course/course-in-progress/overview-tab";
import { ICourse } from "../../../../interfaces";

const CourseInProgressTemplate = ({ course }: { course: ICourse }) => {
	// ReportMentorModal

	return (
		<>
			{/* {!loading && error && <div className="">Something went wrong</div>} */}
			{/* {!error && ( */}
			<div className="min-h-[50vh] h-full sm:px-10 px-4 pb-20">
				<CourseInProgressTopHeader {...{ course }} />
				<div className="flex flex-col lg:flex-row justify-between gap-5 w-full items-start">
					<div className="relative flex-grow mt-5 w-full lg:w-auto">
						<VideoComponent {...{ course }} />
						<div className="lg:max-w-5xl">
							<CourseOverviewTabComponent {...{ course }} />
						</div>
						<div className="flex items-center gap-5 mt-5 flex-wrap">
							<span className="text-[red] text-sm">Report Course</span>
							<Socials />
						</div>
					</div>
					<CourseContents inProgress course={course} className="lg:max-w-[30%] lg:mt-6 xl:mt-6" />
				</div>
			</div>
			{/* )} */}
		</>
	);
};

export default CourseInProgressTemplate;
