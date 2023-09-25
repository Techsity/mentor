import React, { useEffect, useState } from "react";
import DisplayCourseCard from "../../../atom/cards/DisplayCourseCard";
import courses from "../../../../../data/courses";

const CoursesList = ({
	activeLink,
	activeCategory,
}: {
	activeLink: string;
	activeCategory: string;
}) => {
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
		return () =>
			window.removeEventListener("resize", () =>
				setWindowWidth(window.innerWidth),
			);
	}, []);
	const isLargeScreen = windowWidth >= 1024;
	const isExtraLargeScreen = windowWidth >= 1600;
	return (
		<div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden md:mx-10 md:border md:p-10 h-auto">
				{courses
					.filter((course) => course.section === activeLink)[0]
					.categories.filter((category) => category.title === activeCategory)[0]
					.availableCourses.map((course, indx) => {
						return <DisplayCourseCard course={course} key={indx} />;
					})
					.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)}
			</div>
		</div>
	);
};

export default CoursesList;
