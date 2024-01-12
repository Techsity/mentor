import React, { useMemo } from "react";
import CourseInProgressDisplayCard from "../../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../../data/courses";

const MentorUploadedCourses = () => {
	const mentorCourses = useMemo(() => courses, []);
	return (
		<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 items-start animate__animated animate__fadeIn">
			{mentorCourses.map((course, i) => (
				<CourseInProgressDisplayCard {...{ course, owner: true }} key={i} />
			))}
		</div>
	);
};

export default MentorUploadedCourses;
