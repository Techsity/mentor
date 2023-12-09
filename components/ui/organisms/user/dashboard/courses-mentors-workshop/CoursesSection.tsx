import React, { useEffect, useMemo, useState } from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import courses, { courseTypes } from "../../../../../../data/courses";
import { scrollUp } from "../../../../../../utils";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { CourseType, ICourse, ICourseCategory } from "../../../../../../interfaces";
import { useRouter } from "next/router";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

type CourseTypeSearchPageProps = {
	category?: string | null;
	type: string;
};

const CoursesSection = () => {
	const router = useRouter();
	const courseQuery = router.query as CourseTypeSearchPageProps;

	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	const [activeSection, setActiveSection] = useState<ActiveCourseType>(courseTypes[0]);
	const [loading, setLoading] = useState<boolean>(true);
	const [allCourses, setAllCourses] = useState<ICourse[]>([]);

	const fetchCourses = () => {
		setLoading(true);
		// fetch courses based on the courseQuery.type and active cateory
		console.log(`Fetching courses with category: ${courseQuery.category} and courseType: ${courseQuery.type}`);
		setTimeout(function () {
			setLoading(false);
			setAllCourses(courses);
		}, 1000);
	};

	useEffect(() => {
		fetchCourses();
	}, [router, activeSection]);

	return (
		<>
			<div className="sticky h-20 top-20 z-20 bg-[#FDFDFD] flex justify-center">
				<div className="flex my-5 gap-6 ">
					{courseTypes.map((type, index) => (
						<div
							key={index}
							onClick={() => {
								setActiveSection(type);
								router.push(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											type: type.name.toLowerCase().trim(),
											category: null,
										},
									},
									undefined,
									{ scroll: false },
								);
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
					: courseQuery.category
					? allCourses
							.filter(
								(course) =>
									course.category.title.toLowerCase().trim() ===
									courseQuery.category?.toLowerCase().trim(),
							)
							.map((course, indx) => {
								return <DisplayCourseCard course={course} key={indx} />;
							})
							.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)
					: allCourses
							.map((course, indx) => {
								return <DisplayCourseCard course={course} key={indx} />;
							})
							.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)}
			</div>
		</>
	);
};

export default CoursesSection;
