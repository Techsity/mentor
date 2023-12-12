import React, { useEffect, useMemo, useState } from "react";
import courses from "../../../../../data/courses";
import useWindowSize from "../../../../../hooks/useWindowSize";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";
import { ICourse } from "../../../../../interfaces";
import { useQuery } from "@apollo/client";
import { ALL_COURSES } from "../../../../../services/graphql/mutations/courses";

type AllCoursesArgs = {
	take: number;
	skip: number;
	category?: string;
	courseType?: string;
};

const CoursesList = ({ activeCategory, activeCourseType }: { activeCategory: string; activeCourseType: string }) => {
	const { data, loading, error, refetch } = useQuery<{ allCourses: ICourse[] }, AllCoursesArgs>(ALL_COURSES, {
		variables: { skip: 0, take: 10, category: activeCategory, courseType: activeCourseType },
		fetchPolicy: "cache-and-network",
	});

	const allCourses = data?.allCourses || [];

	useEffect(() => {
		refetch();
	}, [activeCategory, activeCourseType]);

	if (error) console.log(error);

	return (
		<div className="grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 items-start 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-auto sm:p-5">
			{loading ? (
				Array.from({ length: 3 }).map((_, indx) => {
					return <DisplayCourseCard loading={loading} course={null} key={indx} />;
				})
			) : !loading && !error && allCourses.length < 1 ? (
				<h1 className="text-lg text-[#d31119] tracking-tight">No courses under this section yet.</h1>
			) : (
				allCourses.map((course, indx) => {
					return <DisplayCourseCard loading={loading} course={course} key={indx} />;
				})
			)}
			{!loading && error && <h1 className="text-lg text-[#d31119] tracking-tight">Network Error.</h1>}
		</div>
	);
};

export default CoursesList;
