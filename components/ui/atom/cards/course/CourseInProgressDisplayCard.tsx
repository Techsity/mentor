/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../../interfaces";
import { slugify } from "../../../../../utils";
import Link from "next/link";
import { Play } from "react-ionicons";

const CourseInProgressDisplayCard = (course: ICourse) => {
	const watchedTime = 1050;
	const totalTime = 2300;
	const percentage = (watchedTime / totalTime) * 100;

	return (
		<div className="inline-block snap-start group">
			<div className="w-auto h-auto md:max-w-sm xl:max-w-lg relative overflow-hidden shadow md:py-0 py-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-default">
				<>
					<div className="grid gap-4">
						<div className="relative items-center">
							<div className="bg-black w-full h-full items-center bg-opacity-40 hidden group-hover:block animate__animated animate__fast animate__fadeIn absolute">
								<div className="flex justify-center items-center my-16">
									<Link
										href={`/courses/${slugify(
											course.title,
										)}/learn/`}>
										<div className="bg-white p-4 rounded-full cursor-pointer">
											<Play color="#333333" />
										</div>
									</Link>
								</div>
							</div>
							<img
								src={
									course.imgUrl ||
									"/assets/images/mockups/course_one.png"
								}
								className="w-full h-full"
								alt={course.title}
								loading="lazy"
							/>
						</div>
						<div className="px-5 grid gap-3">
							<h1 className="font-medium tracking-tight">
								{course.title}
							</h1>
							<span className="text-sm">
								{course.mentor.name}
							</span>
							<div className="flex items-start flex-col gap-2 pb-6 w-full">
								<span className="relative overflow-hidden flex items-center bg-zinc-300 h-1 w-full">
									<span
										className={`absolute left-0 h-full bg-[#70C5A1]`}
										style={{
											width: `${parseInt(
												percentage.toFixed(0),
											)}%`,
										}}
									/>
								</span>
								<span className="text-xs">
									{parseInt(percentage.toFixed(0)) < 100
										? `${percentage.toFixed(0)}% complete`
										: `${percentage.toFixed(0)}% completed`}
								</span>
							</div>
						</div>
					</div>
				</>
			</div>
		</div>
	);
};

export default CourseInProgressDisplayCard;
