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
      <div className="grid xl:grid-cols-4 md:grid-cols-2 items-center 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden md:mx-10 md:border md:p-5 h-auto">
        {
          courses
            .find((course) => course.section === activeLink)
            ?.categories.find((category) => category.title === activeCategory)
            ?.availableCourses.filter((course) => course.price === "free") // this should be changed to when pricee === 0
            .map((course, indx) => {
              return <DisplayCourseCard course={course} key={indx} />;
            })
            .slice(0, 4)
          // .slice(0, isExtraLargeScreen ? 8 : isLargeScreen ? 6 : 8)
        }
      </div>
    </div>
  );
};

export default CoursesList;
