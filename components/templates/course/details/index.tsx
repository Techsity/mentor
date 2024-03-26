import React from "react";
import CourseDetailsPageHero from "../../../ui/organisms/course/course-details/hero";
import CourseDetailsBody from "../../../ui/organisms/course/course-details/body";
import { ChevronUpOutline } from "react-ionicons";
import { scrollToTop } from "../../../../utils";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import CoursePageAboutMentor from "../../../ui/organisms/course/course-details/about-mentor";
import OtherCoursesByMentor from "../../../ui/organisms/course/course-details/other-courses-by-mentor";
import { useRouter } from "next/router";
import { ICourse } from "../../../../interfaces";

type Props = { course: ICourse | null };

const CourseDetailsPageTemplate = ({ course }: Props) => {
	
	return !course ? (
		<div className="h-screen flex justify-center items-center">
			<p className="text-black text-xl">Course not found</p>
		</div>
	) : (
		<>
			<div className="">
				<CourseDetailsPageHero {...course} />
				<CourseDetailsBody {...course} />
			</div>
			<CoursePageAboutMentor {...course.mentor} />
			<OtherCoursesByMentor course={course} />
			<div className="mt-28">
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</div>
			{/* <div className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50 md:flex hidden"> */}
			<div className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50" onClick={scrollToTop}>
				<ChevronUpOutline color="green" height="30px" width="30px" />
			</div>
		</>
	);
};

export default CourseDetailsPageTemplate;
