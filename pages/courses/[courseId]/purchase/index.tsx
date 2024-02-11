import React from "react";
import PurchaseCourseTemplate from "../../../../components/templates/course/purchase";
import courses from "../../../../data/courses";

const PurchaseCourse = () => {
	// Todo: fetch course to be purchased
	// Todo: or save courseId and necessary details to store and get here
	const course = courses[0];
	return <PurchaseCourseTemplate {...course} />;
};

export default PurchaseCourse;
