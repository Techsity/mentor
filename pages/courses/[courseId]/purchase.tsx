import React from "react";
import PurchaseCourseTemplate from "../../../components/templates/course/purchase";
import courses from "../../../data/courses";

const PurchaseCourse = () => {
	const course = courses[0].categories[0].availableCourses[0];
	return <PurchaseCourseTemplate {...course} />;
};

export default PurchaseCourse;
