import React, { useEffect, useMemo, useState } from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import courses, { courseTypes } from "../../../../../../data/courses";
import { scrollUp } from "../../../../../../utils";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { CourseType, ICourse, ICourseCategory } from "../../../../../../interfaces";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

const CoursesSection = ({ activeCategory }: { activeCategory: string }) => {
	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	const [activeSection, setActiveSection] = useState<ActiveCourseType>(courseTypes[0]);
	const [loading, setLoading] = useState<boolean>(true);
	const [allCourses, setAllCourses] = useState<ICourse[]>([]);

	const fetchCourses = () => {
		setLoading(true);
		console.log("Fetching courses..");
		setTimeout(function () {
			setLoading(false);
			setAllCourses(courses);
		}, 1000);
	};

	useEffect(() => {
		fetchCourses();
	}, [activeCategory, activeSection]);

	return (
		<>
			<div className="sticky h-20 top-20 z-20 bg-[#FDFDFD] flex justify-center">
				<div className="flex my-5 gap-6 ">
					{courseTypes.map((type, index) => (
						<div
							key={index}
							onClick={() => {
								setActiveSection(type);
								scrollUp(630);
							}}
							className={`capitalize cursor-pointer duration-300 p-1 animate__animated animate__fadeInUp before:absolute before:h-[2px] before:bottom-0 before:duration-300 before:left-0 before:bg-[#078661] relative text-[#094B10] ${
								activeSection.name === type.name ? "before:w-full" : ""
							}`}>
							{type.name}
						</div>
					))}
				</div>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 md:border border-[#D0D0D0] md:p-5 h-auto">
				{loading
					? Array.from({ length: 3 }).map((_, indx) => {
							return <DisplayCourseCard loading course={null} key={indx} />;
					  })
					: allCourses
							// .filter((course) => activeSection)
							.map((course, indx) => {
								return <DisplayCourseCard course={course} key={indx} />;
							})
							.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)}
			</div>
		</>
	);
};

export default CoursesSection;
