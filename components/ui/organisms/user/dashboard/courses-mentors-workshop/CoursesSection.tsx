import React, { useEffect, useMemo, useState } from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import courses, { courseTypes } from "../../../../../../data/courses";
import { scrollUp, slugify } from "../../../../../../utils";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { CourseType, ICourse, ICourseCategory } from "../../../../../../interfaces";
import { useRouter } from "next/router";
import { handleWebpackExtenalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

type CourseTypeSearchPageProps = {
	category?: string | null;
	type: string;
};

const CoursesSection = () => {
	const router = useRouter();
	const courseQuery = router.query as CourseTypeSearchPageProps;

	const { isExtraLargeScreen, isLargeScreen } = useWindowSize();
	const [activeSection, setActiveSection] = useState<string>(courseQuery.type || courseTypes[0].name);
	const [loading, setLoading] = useState<boolean>(true);
	const [allCourses, setAllCourses] = useState<ICourse[]>([]);

	// fetch courses based on the courseQuery.type and cateory
	const fetchCourses = async () => {
		setLoading(true);
		console.log(`Fetching courses with category: ${courseQuery.category} and courseType: ${courseQuery.type}`);
		return new Promise<ICourse[]>((resolve, reject) => resolve(courses)); // data fetch simulation
	};

	useEffect(() => {
		if (courseQuery.type) setActiveSection(courseQuery.type);
		// if (courseQuery.type || courseQuery.category)
		fetchCourses()
			.then((courses) => {
				setTimeout(function () {
					setLoading(false);
					setAllCourses(courses);
				}, 1000);
			})
			.catch((err) => {
				console.error("Error fetching courses: ", err);
				setLoading(false);
			});
	}, [router]);

	const handleChangeCourseType = (type: ActiveCourseType) => {
		if (slugify(courseQuery.type) !== slugify(type.name)) {
			setLoading(true);
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
			setActiveSection(type.name);
		}
		scrollUp(630);
	};

	const coursesFilteredByCategory = allCourses
		.filter(
			(course) => course.category.title.toLowerCase().trim() === courseQuery.category?.toLowerCase().trim(),
			//  && activeSection.name.toLowerCase().trim() === courseQuery.type.toLowerCase().trim(),
		)
		.map((course, indx) => {
			return <DisplayCourseCard course={course} key={indx} />;
		});

	return (
		<>
			<div className="sticky h-20 top-20 z-20 bg-[#FDFDFD] flex justify-center">
				<div className="flex my-5 gap-6 select-none">
					{courseTypes.map((type, index) => (
						<div
							key={index}
							onClick={() => handleChangeCourseType(type)}
							className={`capitalize cursor-pointer duration-300 p-1 animate__animated animate__fadeInUp before:absolute before:h-[2px] before:bottom-0 before:duration-300 before:left-0 before:bg-[#078661] relative text-[#094B10] ${
								activeSection === type.name ? "before:w-full" : ""
							}`}>
							{type.name}
						</div>
					))}
				</div>
			</div>
			{courseQuery.category ? (
				<div className="mt-6 text-sm md:mx-10 mx-5 md:p-5">
					<p className="capitalize">
						Result on the query:{" "}
						{courseQuery.type && (
							<span className="">
								course type {">"} {courseQuery.type}{" "}
							</span>
						)}
						{courseQuery.type && courseQuery.category && "||"}
						{courseQuery.category && (
							<span className="">{courseQuery.category && " category > " + courseQuery.category}</span>
						)}
					</p>
				</div>
			) : (
				courseQuery.type && (
					<div className="mt-6 text-sm md:mx-10 mx-5 md:p-5">
						<p className="capitalize">
							Result on the query:{" "}
							{courseQuery.type && (
								<span className="">
									course type {">"} {courseQuery.type}{" "}
								</span>
							)}
							{courseQuery.type && courseQuery.category && "|| "}
							{courseQuery.category && (
								<span className="">{courseQuery.category && "category > " + courseQuery.category}</span>
							)}
						</p>
					</div>
				)
			)}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 md:border border-[#D0D0D0] md:p-5 h-auto">
				{loading
					? Array.from({ length: 3 }).map((_, indx) => {
							return <DisplayCourseCard loading course={null} key={indx} />;
					  })
					: courseQuery.category
					? coursesFilteredByCategory.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)
					: allCourses
							.map((course, indx) => {
								return <DisplayCourseCard course={course} key={indx} />;
							})
							.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)}
				{!loading && allCourses.length < 1 ? (
					<h1 className="text-lg text-[#d31119] tracking-tight">No courses under this section yet.</h1>
				) : (
					!loading &&
					courseQuery.category &&
					coursesFilteredByCategory.length < 1 && (
						<h1 className="text-lg text-[#d31119] tracking-tight">No courses under this section yet.</h1>
					)
				)}
			</div>
		</>
	);
};

export default CoursesSection;
