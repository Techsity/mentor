import React from "react";
import { ICourse } from "../../../../../../interfaces";
import ListReviews from "../../../../atom/common/course/ListReviews";
import Socials from "../../../../atom/common/course/Socials";
import CourseRequirements from "./CourseRequirements";
import WhatToLearn from "./WhatToLearn";
import AboutCourse from "./AboutCourse";
import CourseContents from "./CourseContents";

const CourseDetailsBody = (course: ICourse) => {
	return (
		<div className="min-h-[50vh] h-full lg:px-12 sm:px-6 px-4">
			<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow w-full xl:min-h-screen overflow-hidden">
					<AboutCourse {...course} />
					<WhatToLearn {...course} />
					<CourseRequirements {...course} />
					<div className="my-8">
						<ListReviews {...{ reviews: course.reviews }} />
					</div>
					<div className="">
						<div className="flex flex-wrap max-w-xl justify-between items-center mt-5">
							<p className="text-[#F15E63] cursor-pointer hover:underline text-sm">! Report Mentor</p>
							<Socials />
						</div>
					</div>
				</div>
				<CourseContents className="lg:max-w-[30%]" course={course} />
			</div>
		</div>
	);
};

export default CourseDetailsBody;
