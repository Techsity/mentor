/* eslint-disable @next/next/no-img-element */
import React from "react";
import CourseInProgressDisplayCard from "../../../../ui/atom/cards/course/CourseInProgressDisplayCard";
import { ICourse } from "../../../../../interfaces";

const UserOngoingCoursesTemplate = ({
	ongoingCourses,
}: {
	ongoingCourses: ICourse[];
}) => {
	return (
		<div className="min-h-[50dvh] lg:px-20 sm:px-12 px-6 pb-10">
			<div className="my-10">
				<h1 className="text-3xl">Courses in Progress</h1>
			</div>
			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
				{ongoingCourses.map((course, i) => (
					<CourseInProgressDisplayCard {...course} key={i} />
				))}
			</div>
		</div>
	);
};

export default UserOngoingCoursesTemplate;
