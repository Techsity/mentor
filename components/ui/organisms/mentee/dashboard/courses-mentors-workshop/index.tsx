import React, { useState } from "react";
import CoursesMentorsWorkshopNav from "./CoursesMentorsWorkshopNav";
import CoursesList from "../../../home/courses/CoursesList";
import DisplayCourseCard from "../../../../atom/cards/home/DisplayCourseCard";
import courses from "../../../../../../data/courses";
import useWindowSize from "../../../../../../hooks/useWindowSize";

const CoursesMentorsWorkshop = () => {
	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	const links = ["Courses", "Workshop", "Mentors"];
	const [activeLink, setActiveLink] = useState<string>(links[0]);
	const [activeSection, setActiveSection] = useState<
		"Technical" | "Vocational" | "Educational"
	>("Technical");

	const [activeCategory, setActiveCategory] = useState<string>(
		courses.filter((course) => course.section === activeSection)[0]
			? courses.filter((course) => course.section === activeSection)[0]
					.categories[0].title
			: "",
	);

	return (
		<div>
			<div className="flex justify-center bg-[#EEFFF8] py-6">
				<CoursesMentorsWorkshopNav
					links={links}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				/>
			</div>
			<div className="my-5 min-h-[50vh]">
				{activeLink === "Courses" ? (
					<>
						<div className="flex justify-center">
							<div className="flex my-5 gap-6">
								{courses.map((course, index) => (
									<div
										key={index}
										onClick={() => setActiveSection(course.section)}
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
				) : null}
			</div>
		</div>
	);
};

export default CoursesMentorsWorkshop;
