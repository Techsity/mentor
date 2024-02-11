import React from "react";
import CourseDetailsPageTemplate from "../../../components/templates/course/details";
import courses from "../../../data/courses";

const CourseDetailsPage = () => {
	// Todo: use useQuery to fetch course
	const course = courses[0];
	return <CourseDetailsPageTemplate {...course} />;
};

export default CourseDetailsPage;
