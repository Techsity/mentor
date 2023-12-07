import React, { useEffect, useState } from "react";
import courses from "../../../../../data/courses";
import useWindowSize from "../../../../../hooks/useWindowSize";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";

const CoursesList = ({ activeCategory }: { activeCategory: string }) => {
	const filteredCourses = courses.filter((course) => course.category.title === activeCategory);
	return (
		<div>
			<div className="grid xl:grid-cols-4 md:grid-cols-2 items-center 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-auto">
				{
					filteredCourses.length >= 1 ? (
						filteredCourses
							.map((course, indx) => {
								return <DisplayCourseCard course={course} key={indx} />;
							})
							.slice(0, 4)
					) : (
						<h1 className="text-lg text-[#d31119] tracking-tight">No courses under this section yet.</h1>
					)
					// .slice(0, isExtraLargeScreen ? 8 : isLargeScreen ? 6 : 8)
				}
			</div>
		</div>
	);
};

export default CoursesList;
