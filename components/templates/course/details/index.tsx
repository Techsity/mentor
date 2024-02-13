import React from "react";
import CourseDetailsPageHero from "../../../ui/organisms/course/course-details/hero";
import CourseDetailsBody from "../../../ui/organisms/course/course-details/body";
import { ChevronUpOutline } from "react-ionicons";
import { scrollToTop } from "../../../../utils";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import CoursePageAboutMentor from "../../../ui/organisms/course/course-details/about-mentor";
import OtherCoursesByMentor from "../../../ui/organisms/course/course-details/other-courses-by-mentor";
import courses from "../../../../data/courses";
import { useRouter } from "next/router";

const CourseDetailsPageTemplate = () => {
	const router = useRouter();
	const courseId = String(router.query.courseId);
	// Todo: use useQuery to fetch course
	const course = courses[0];
	return (
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
