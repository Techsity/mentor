/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ICourse } from "../../../../../interfaces";
import { calculateRatingsInReviews, formatFollowersCount, slugify } from "../../../../../utils";
import Link from "next/link";
import { ArrowForwardSharp, Play } from "react-ionicons";
import { StarRatingIcon } from "../../icons/svgs";
import { PrimaryButton } from "../../buttons";
import { navigateToAuthPage } from "../../../../../utils/auth";
import { useRouter } from "next/router";

const CourseInProgressDisplayCard: FC<{
	course: ICourse | null;
	owner?: boolean;
	loading?: boolean;
}> = ({ course, owner }) => {
	const watchedTime = 1050;
	const totalTime = 2300;
	const percentageWatched = parseInt(((watchedTime / totalTime) * 100).toFixed(0));
	const watched = false;
	const router = useRouter();
	const loading = true;
	const ratings = course !== null && calculateRatingsInReviews(course.reviews);
	return (
		<div className="flex flex-col items-start bg-white duration-300 shadow cursor-default relative h-auto md:h-[360px]">
			<div className="absolute animate__animated animate__fadeIn animate__faster w-full z-10 text-white p-2">
				<div className="justify-between flex items-center w-full">
					{!loading && (
						<span className="text-xs font-medium">
							{!owner
								? percentageWatched < 100
									? `${percentageWatched}% complete`
									: `${percentageWatched}% complete`
								: formatFollowersCount(Number(course?.reviews.length)) + " students"}
						</span>
					)}
					{!loading && (
						<Link href={`/courses/${slugify(String(course?.title))}`}>
							<div className="cursor-pointer">
								<ArrowForwardSharp color="#fff" height="20px" width="20px" />
							</div>
						</Link>
					)}
				</div>
			</div>
			<div className="h-44 w-full relative overflow-hidden">
				{loading && (
					<>
						<span className="bg-gray-200 h-full w-full absolute top-0 left-0 animate__animated animate__fadeIn animate__infinite z-10" />
						<span className="bg-gray-300 h-full w-full absolute top-0 left-0" />
					</>
				)}
				{!loading && (
					<img
						src={String(course?.course_images) || "/assets/images/mockups/course_one.png"}
						className="w-full h-full"
						alt={String(course?.title)}
						loading="lazy"
					/>
				)}
			</div>
			<div className="grid gap-1 mt-3 p-3 w-full">
				<h1 className={loading ? "p-1 my-2 mb-6 w-[80%] bg-gray-200" : "tracking-tight font-normal"}>
					{!loading && course?.title.slice(0, 31)}
				</h1>
				<div className="flex items-center gap-2 justify-between text-xxs w-full">
					{loading ? (
						Array.from({ length: 4 }).map((_, index) => (
							<span className="p-0.5 px-8 bg-gray-200" key={index} />
						))
					) : (
						<>
							<span className="font-normal">{course?.course_level.split("_").join(" ")}</span>
							<span className="font-normal">{course?.duration} hours</span>
							<span className="font-normal">
								{formatFollowersCount(Number(course?.reviews.length))} students
							</span>
							<div className={"flex items-center gap-2 text-[#094B10]"}>
								{ratings}
								<StarRatingIcon />
							</div>
						</>
					)}
				</div>
				<p className={loading ? "my-5 p-0.5 px-8 bg-gray-200" : "text-xsm font-normal w-full mt-3"}>
					{!loading && course?.description}
				</p>
				<div className="flex items-center justify-between mt-3 w-full">
					<div className="flex gap-2 items-center text-xsm relative overflow-hidden rounded-full w-8 h-8">
						{loading && (
							<>
								<div className="bg-gray-400 absolute h-full w-full top-0 left-0" />
								<div className="bg-gray-200 absolute h-full w-full top-0 left-0 animate__animated animate__fadeIn animate__infinite" />
							</>
						)}
						{!loading && (
							<img
								src={course?.mentor.user.avatar || "/assets/images/avatar.png"}
								alt={course?.mentor.user.name}
								className="w-full h-full rounded-full"
								loading="lazy"
							/>
						)}

						<h1 className={loading ? "p-0.5 px-5 bg-gray-200" : ""}>
							{!loading && course?.mentor.user.name}
						</h1>
					</div>
					{loading && <span className="bg-gray-300 p-3 px-6" />}
					{!loading && !owner ? (
						<PrimaryButton
							title={percentageWatched >= 100 ? "Start Over" : !watched ? "Start" : "Continue"}
							className="p-2 px-4 text-xs"
							link={`/courses/${slugify(String(course?.title))}/learn`}
						/>
					) : (
						!loading && (
							<PrimaryButton
								title="Edit Course"
								className="p-2 px-4 text-xs"
								onClick={() =>
									navigateToAuthPage(
										router,
										`/profile/courses/edit/${slugify(String(course?.title))}`,
									)
								}
							/>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseInProgressDisplayCard;
