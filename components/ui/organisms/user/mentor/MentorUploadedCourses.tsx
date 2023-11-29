import React, { useMemo } from "react";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../data/courses";

const MentorUploadedCourses = () => {
	const mentorCourses = useMemo(
		() => courses[0].categories[0].availableCourses,
		[courses],
	);
	return (
		<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
			{mentorCourses.map((course, i) => (
				<CourseInProgressDisplayCard
					{...{ course, owner: true }}
					key={i}
				/>
			))}
		</div>
	);
};

export default MentorUploadedCourses;
