import React from "react";
import { ICourse } from "../../../../../../interfaces";

const AboutCourse = (course: ICourse) => {
	return (
		<div className="">
			<h1 className="font-semibold">About this Course</h1>
			<p className="text-zinc-400 font-[300] max-w-2xl py-2 text-sm">{course.description}</p>
		</div>
	);
};

export default AboutCourse;
