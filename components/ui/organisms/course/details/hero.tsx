import React from "react";
import { ICourse } from "../../../../../interfaces";

const CourseDetailsPageHero = (course: ICourse) => {
	return (
		<div className="bg-[#0C202B] w-full min-h-[65vh] pt-20 text-white">
			<div className="">{course.title}</div>
		</div>
	);
};

export default CourseDetailsPageHero;
