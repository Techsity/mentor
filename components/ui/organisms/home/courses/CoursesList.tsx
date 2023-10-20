import React, { useEffect, useState } from "react";
import courses from "../../../../../data/courses";
import useWindowSize from "../../../../../hooks/useWindowSize";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";

const CoursesList = ({
	activeLink,
	activeCategory,
}: {
	activeLink: string;
	activeCategory: string;
}) => {
	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	return (
		<div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden md:mx-10 md:border md:p-5 h-auto">
				{courses
					.filter((course) => course.section === activeLink)[0]
					.categories.filter(
						(category) => category.title === activeCategory,
					)[0]
					.availableCourses.map((course, indx) => {
						return <DisplayCourseCard course={course} key={indx} />;
					})
					.slice(0, isExtraLargeScreen ? 8 : isLargeScreen ? 6 : 8)}
			</div>
		</div>
	);
};

export default CoursesList;
