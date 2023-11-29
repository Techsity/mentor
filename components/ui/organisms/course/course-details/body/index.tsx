import React, { MouseEventHandler, useState } from "react";
import { ICourse, ICourseContent } from "../../../../../../interfaces";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { calculateTotalDuration, parseDuration } from "../../../../../../utils";
import { PrimaryButton } from "../../../../atom/buttons";
import ListReviews from "../../../../atom/common/course/ListReviews";
import Socials from "../../../../atom/common/course/Socials";
import CourseRequirements from "./CourseRequirements";
import WhatToLearn from "./WhatToLearn";
import AboutCourse from "./AboutCourse";
import CourseContents from "./CourseContents";

const CourseDetailsBody = (course: ICourse) => {
	return (
		<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-4">
			<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow w-full xl:min-h-screen overflow-hidden">
					<AboutCourse {...course} />
					<WhatToLearn {...course} />
					<CourseRequirements {...course} />
					<div className="my-8">
						<ListReviews />
					</div>
					<div className="">
						<div className="flex flex-wrap max-w-xl justify-between items-center mt-5">
							<p className="text-[#F15E63] cursor-pointer hover:underline">
								! Report Mentor
							</p>
							<Socials />
						</div>
					</div>
				</div>
				<CourseContents course={course} />
			</div>
		</div>
	);
};

export default CourseDetailsBody;
