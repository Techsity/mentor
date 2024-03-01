/* eslint-disable @next/next/no-img-element */
import React from "react";
import classNames from "classnames";
import { ICourse, IReview } from "../../../../../interfaces";
import { calculateRatingsInReviews, formatFollowersCount } from "../../../../../utils";

const CourseInProgressTopHeader = ({ course, loading }: { course?: ICourse; loading?: boolean }) => {
	return (
		<div className="w-full flex md:flex-row flex-col gap-5 justify-between relative pt-10">
			<div className="flex-grow overflow-hidden inline-flex flex-col gap-3">
				{loading && <span className="bg-gray-200 p-0.5 w-1/4 my-3" />}
				{!loading && (
					<span className="flex gap-1 cursor-default text-xs items-center whitespace-nowrap flex-wrap">
						Courses / Technical / Marketing /
						<span className="text-[#70C5A1]">
							{course && course.title.length > 50 ? course.title.slice(0, 50) + "..." : course?.title}
						</span>
					</span>
				)}
				<div className="grid gap-2">
					{loading && <span className="bg-gray-200 p-1 w-3/4 my-3" />}
					{!loading && (
						<h1
							className="md:text-2xl 2xl:text-4xl font-bold max-w-2xl pb-2"
							style={{ fontFamily: "Days One" }}>
							{course?.title}
						</h1>
					)}
					<div className="flex items-center max-w-sm justify-between gap-4 font-[300] text-sm 2xl:text-xl 2xl:max-w-lg">
						{loading &&
							Array.from({ length: 5 }).map((_, indx) => (
								<span key={indx} className="bg-gray-200 p-0.5 px-10 my-3" />
							))}
						{!loading && <p className="text-xs">{course?.course_level.split("_").join(" ")}</p>}
						{!loading && <p className="text-xs">{course?.duration} hours</p>}
						{!loading && <p className="text-xs">{course?.reviews && course.reviews.length} reviews</p>}
						<div className="flex items-center gap-2 text-[13px] 2xl:text-xl">
							{!loading && (
								<>
									{calculateRatingsInReviews(course?.reviews as IReview[])}
									<svg width="13" height="13" viewBox="0 0 9 9" fill="none">
										<path
											d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
											fill="#FFB100"
										/>
									</svg>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="w-auto h-auto lg:max-w-lg 2xl:max-w-2xl sm:max-w-md">
				<div className="my-2 sm:my-4 flex items-center gap-2 overflow-hidden">
					<div className="flex gap-1.5 items-center">
						{loading && <span className="bg-gray-200 rounded-full w-20 h-20" />}
						{!loading && (
							<img
								src={course?.mentor.user.avatar || "/assets/images/avatar.png"}
								className="rounded-full w-20"
								alt={course?.mentor.user.name}
							/>
						)}
					</div>
					<div className="grid items-center max-w-sm font-[300] text-sm gap-1">
						{loading &&
							Array.from({ length: 3 }).map((_, indx) => (
								<span className="p-0.5 px-10 w-full bg-gray-300 mt-1" key={indx} />
							))}
						{!loading && (
							<h1 className="font-semibold text-sm flex item-center gap-2">
								{course?.mentor.user.name}
								{course?.mentor.mentor_verified && (
									<svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5">
										<path
											d="M6.29757 11L4 8.60232L5.04704 7.50965L6.29757 8.81853L9.95296 5L11 6.09266L6.29757 11Z"
											fill="#0CF27E"
										/>
										<rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#70C5A1" />
									</svg>
								)}
							</h1>
						)}
						{!loading && <p className="text-xs capitalize">{course?.mentor.role.split("_").join(" ")} </p>}
						{!loading && (
							<p className="flex gap-1 items-center text-xs">
								{formatFollowersCount(Number(course?.mentor.courses.length))} Courses |{" "}
								{formatFollowersCount(Number(course?.mentor.followers.length))} Followers
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInProgressTopHeader;
