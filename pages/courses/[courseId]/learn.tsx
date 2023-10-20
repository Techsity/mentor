import React from "react";
import courses from "../../../data/courses";
import CourseInProgressTemplate from "../../../components/templates/course/in-progress";
import protectedPageWrapper from "../../protectedPageWrapper";

const CourseInProgress = () => {
	const course = courses[0].categories[0].availableCourses[0];
	return <CourseInProgressTemplate {...course} />;
};

export default protectedPageWrapper(CourseInProgress);
