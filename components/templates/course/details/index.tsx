import React from "react";
import CourseDetailsPageHero from "../../../ui/organisms/course/details/hero";
import { ICourse } from "../../../../interfaces";

const CourseDetailsPageTemplate = (course: ICourse) => {
	return (
		<>
			<div className="">
				<CourseDetailsPageHero {...course} />
			</div>
		</>
	);
};

export default CourseDetailsPageTemplate;
