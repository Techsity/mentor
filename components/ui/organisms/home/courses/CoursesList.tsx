import React from "react";
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
type CourseListProps = { activeCategory: string; activeCourseType: string; skip?: number; limit?: number };

const CoursesList = ({ activeCategory, activeCourseType, limit = 10, skip = 0 }: CourseListProps) => {
	const { data, loading, error } = useQuery<{ allCourses: ICourse[] }, AllCoursesArgs>(ALL_COURSES, {
		variables: {
			skip: skip as number,
			take: limit as number,
			category: activeCategory,
			courseType: activeCourseType,
		},
		fetchPolicy: "cache-and-network",
	});

	const allCourses = data?.allCourses || [];

	// useEffect(() => {
	// 	refetch();
	// }, [activeCategory, activeCourseType]);

	if (error) console.log(error);

	return (
		<div className="grid lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 items-start bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-auto sm:p-5">
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
