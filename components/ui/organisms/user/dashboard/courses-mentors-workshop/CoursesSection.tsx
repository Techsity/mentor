import React, { useEffect, useMemo, useState } from "react";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import courses, { courseTypes } from "../../../../../../data/courses";
import { scrollUp, slugify } from "../../../../../../utils";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { CourseType, ICourse, ICourseCategory } from "../../../../../../interfaces";
import { useRouter } from "next/router";
import { handleWebpackExtenalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import CoursesList from "../../../home/courses/CoursesList";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

type CourseTypeSearchPageProps = {
	category?: string | null;
	type: string;
};

const CoursesSection = () => {
	const router = useRouter();
	const courseQuery = router.query as CourseTypeSearchPageProps;
	const [activeSection, setActiveSection] = useState<string>(courseQuery.type || courseTypes[0].name);
	useEffect(() => {
		if (courseQuery.type) setActiveSection(courseQuery.type);
		// if (courseQuery.type || courseQuery.category)
	}, [router]);

	const handleChangeCourseType = (type: ActiveCourseType) => {
		if (slugify(courseQuery.type) !== slugify(type.name)) {
			router.push(
				{
					pathname: router.pathname,
					query: {
						...router.query,
						type: slugify(type.name),
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
			{courseQuery.type || courseQuery.category ? (
				<div className="mt-6 text-sm md:mx-10 mx-5 md:p-5">
					<p className="capitalize">
						Category{" > "}
						{courseQuery.type && <span className="">{courseQuery.type} </span>}
						{courseQuery.type && courseQuery.category && "> "}
						{courseQuery.category && (
							<span className="">{courseQuery.category && courseQuery.category}</span>
						)}
					</p>
				</div>
			) : null}

			<div className=" overflow-hidden md:mx-10 mx-5 md:border border-[#D0D0D0] md:p-5 h-auto">
				<CoursesList activeCategory={courseQuery.category || ""} activeCourseType={courseQuery.type || ""} />
			</div>
		</>
	);
};

export default CoursesSection;
