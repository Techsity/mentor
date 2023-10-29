/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import CourseInProgressTopHeader from "../../../ui/organisms/course-in-progress/CourseInProgressTopHeader";
import CourseContents from "../../../ui/organisms/course-details/body/CourseContents";
import VideoComponent from "../../../ui/organisms/course-in-progress/video/VideoComponent";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import Socials from "../../../ui/atom/common/course/Socials";
import Link from "next/link";

type videoNavType = "about-course" | "review" | "lecture-notes";

const CourseInProgressTemplate = (course: ICourse) => {
	const [active, setActive] = useState<videoNavType>("about-course");

	const VideoNav = () => {
		return (
			<div className="flex items-center gap-10 bg-[#EEEEEE] p-3 border border-black w-full sm:px-6">
				<div
					onClick={() => setActive("about-course")}
					className={`${
						active === "about-course" ? "font-medium" : ""
					} select-none cursor-pointer text-black capitalize`}>
					About Course
				</div>
				<div
					onClick={() => setActive("review")}
					className={`${
						active === "review" ? "font-medium" : ""
					} select-none cursor-pointer text-black capitalize`}>
					Review
				</div>
				<div
					onClick={() => setActive("lecture-notes")}
					className={`${
						active === "lecture-notes" ? "font-medium" : ""
					} select-none cursor-pointer text-black capitalize`}>
					Lecture Notes
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="min-h-[50vh] h-full lg:px-16 sm:px-10 px-4">
				<div className="xl:min-h-[45dvh] lg:min-h-[40dvh]">
					<CourseInProgressTopHeader {...course} />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-5 w-full lg:items-start pb-20">
					<div className="relative w-full">
						<VideoComponent course={course} />
						<div className="my-5">
							<VideoNav />
						</div>
						<div className="">
							{active === "about-course" ? (
								<>
									<p className="animate__animated animate__fadeIn text-sm text-[#9A9898] font-[300]">
										{course.description}
									</p>
								</>
							) : active === "lecture-notes" ? (
								<></>
							) : active === "review" ? (
								<></>
							) : null}
						</div>
						<div className="flex items-center gap-5 mt-5">
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
