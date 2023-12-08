import React, { useEffect, useMemo, useState } from "react";
import courses from "../../../../../data/courses";
import useWindowSize from "../../../../../hooks/useWindowSize";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";
import { ICourse } from "../../../../../interfaces";

const CoursesList = ({ activeCategory }: { activeCategory: string }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [allCourses, setAllCourses] = useState<ICourse[]>([]);

	const fetchCoursesByCategory = () => {
		setLoading(true)
		console.log("api call 2");
		if (activeCategory) {
			// query to fetch courses by category here
			const timeout=setTimeout(()=>{ //simulate slow loading
				setLoading(false)
				clearTimeout(timeout)
				setAllCourses(courses)
			},1000)
		} else {
			// query to fetch courses normally
		}
	};

	//To-do: remove this filteredCourses, as allCourses will be fetched based on category
	const filteredCourses = useMemo(() => {
		return allCourses.filter((course) => course.category.title === activeCategory);
	}, [activeCategory, allCourses]);
// 

	useEffect(()=>{
		fetchCoursesByCategory();
	},[activeCategory])

	return (
		<div className="grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 items-start 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-auto sm:p-5">
			{/* <div className="grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 items-start 2xl:grid-cols-4 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-[65dvh] overflow-y-auto sm:p-5"> */}
			{ (
				filteredCourses.map((course, indx) => {
					return <DisplayCourseCard loading={loading} course={course} key={indx} />;
				})
			) }
			{!loading&& filteredCourses.length < 1&& (
				// .slice(0, 4)
				<h1 className="text-lg text-[#d31119] tracking-tight">No courses under this section yet.</h1>
			)}
		</div>
	);
};

export default CoursesList;
