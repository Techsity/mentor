import React, { useState } from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import courses from "../../../../../../data/courses";
import DisplayCourseCard from "../../../../atom/cards/home/DisplayCourseCard";

const CoursesSection = () => {
	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	const [activeSection, setActiveSection] = useState<
		"Technical" | "Vocational" | "Educational"
	>("Technical");

	return (
		<>
			<div className="flex justify-center">
				<div className="flex my-5 gap-6">
					{courses.map((course, index) => (
						<div
							key={index}
							onClick={() => {
								setActiveSection(course.section);
								// window.scrollBy({
								// 	top: 150,
								// 	behavior: "smooth",
								// });
							}}
							className={`cursor-pointer duration-300 p-1 animate__animated animate__fadeInUp before:absolute before:h-[2px] before:bottom-0 before:duration-300 before:left-0 before:bg-[#078661] relative text-[#094B10] ${
								activeSection === course.section ? "before:w-full" : ""
							}`}
						>
							{course.section}
						</div>
					))}
				</div>
			</div>
			<div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 md:border border-[#D0D0D0] md:p-10 h-auto">
				{courses
					.filter((course) => course.section === activeSection)
					.map((section) =>
						section.categories.map((category) =>
							category.availableCourses
								.map((course, indx) => {
									return <DisplayCourseCard course={course} key={indx} />;
								})
								.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4),
						),
					)}
			</div>
		</>
	);
};

export default CoursesSection;
