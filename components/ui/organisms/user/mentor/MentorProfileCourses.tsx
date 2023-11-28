import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import courses from "../../../../../data/courses";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";

const MentorProfileCourses = () => {
	const user = useSelector(currentUser);
	const mentorCourses = useMemo(
		() => courses[0].categories[0].availableCourses,
		[],
	);
	return (
		<>
			<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
				{mentorCourses.map((course, i) => (
					<CourseInProgressDisplayCard {...course} key={i} />
				))}
			</div>
		</>
	);
};

export default MentorProfileCourses;
