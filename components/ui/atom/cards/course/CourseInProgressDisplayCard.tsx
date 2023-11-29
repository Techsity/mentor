/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ICourse } from "../../../../../interfaces";
import { formatFollowersCount, slugify } from "../../../../../utils";
import Link from "next/link";
import { ArrowForwardSharp, Play } from "react-ionicons";
import { StarRatingIcon } from "../../icons/svgs";
import { PrimaryButton } from "../../buttons";

const CourseInProgressDisplayCard: FC<{
	course: ICourse;
	owner?: boolean;
}> = ({ course, owner }) => {
	const watchedTime = 1050;
	const totalTime = 2300;
	const percentageWatched = parseInt(
		((watchedTime / totalTime) * 100).toFixed(0),
	);

	return (
		<div className="flex flex-col items-start bg-white duration-300 shadow cursor-default relative">
			<div className="absolute animate__animated animate__fadeIn animate__faster w-full z-10 text-white p-2">
				<div className="justify-between flex items-center w-full">
					<span className="text-xs font-medium">
						{!owner
							? percentageWatched < 100
								? `${percentageWatched}% complete`
								: `${percentageWatched}% complete`
							: formatFollowersCount(course.limit) + " students"}
					</span>
					<Link href={`/courses/${slugify(course.title)}`}>
						<div className="cursor-pointer">
							<ArrowForwardSharp
								color="#fff"
								height="20px"
								width="20px"
							/>
						</div>
					</Link>
				</div>
			</div>
			<div className="h-40 w-full">
				<img
					src={
						course.imgUrl || "/assets/images/mockups/course_one.png"
					}
					className="w-full h-full"
					alt={course.title}
					loading="lazy"
				/>
			</div>
			<div className="grid gap-1 mt-3 p-3">
				<h1 className="tracking-tight font-normal">
					{course.title.slice(0, 31)}
				</h1>
				<div className="flex items-center gap-2 justify-between text-xxs w-full">
					<span className="font-normal">{course.level}</span>
					<span className="font-normal">{course.duration} hours</span>
					<span className="font-normal">
						{formatFollowersCount(course.limit)} students
					</span>
					<div className="flex items-center gap-2 text-[#094B10]">
						{course.rating}
						<StarRatingIcon />
					</div>
				</div>

				<p className="text-xsm font-normal w-full mt-3">
					{course.description}
				</p>
				<div className="flex items-center justify-between mt-3 w-full">
					<div className="flex gap-2 items-center text-xsm relative">
						<img
							src={
								course.mentor.avatar ||
								"/assets/images/avatar.png"
							}
							alt={course.mentor.name}
							className="w-8 rounded-full"
							loading="lazy"
						/>
						<h1>{course.mentor.name}</h1>
					</div>
					{!owner ? (
						<PrimaryButton
							title={
								percentageWatched >= 100
									? "Start Over"
									: "Continue"
							}
							className="p-2 px-4 text-xs"
						/>
					) : (
						<PrimaryButton
							title="Edit Course"
							className="p-2 px-4 text-xs"
							link={`/profile/#my-courses/${slugify(course.title)}/edit`}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseInProgressDisplayCard;
