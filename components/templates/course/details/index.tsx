import React from "react";
import CourseDetailsPageHero from "../../../ui/organisms/course/details/hero";
import { ICourse } from "../../../../interfaces";
import CourseDetailsBody from "../../../ui/organisms/course/details/body";

const CourseDetailsPageTemplate = (course: ICourse) => {
	return (
		<>
			<div className="">
				<CourseDetailsPageHero {...course} />
				<CourseDetailsBody {...course} />
			</div>
		</>
	);
};

export default CourseDetailsPageTemplate;
