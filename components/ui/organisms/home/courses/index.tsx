// Still need to be cleaned up

import React, { useEffect, useMemo, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import CoursesNav from "./CoursesNav";
import { courseCategories, courseTypes } from "../../../../../data/courses";
import { ChevronForwardSharp } from "react-ionicons";
import Link from "next/link";
import CoursesList from "./CoursesList";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { CourseType, ICourseCategory } from "../../../../../interfaces";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../services/graphql/mutations/courses";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

const HomepageCourseSection = () => {
	const [categories, setCategories] = useState<ICourseCategory[]>([]);
	const [activeCourseType, setActiveCourseType] = useState<ActiveCourseType>(courseTypes[0]);
	const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
	const [fetchAllCategories] = useLazyQuery<{ getAllCategories: ICourseCategory[] }, any>(GET_ALL_CATEGORIES);

	const currentCategory = useMemo<string>(() => {
		return categories.length >= 1 ? categories[activeCategoryIndex].title : "";
	}, [categories, activeCategoryIndex]);

	// Query to fetch course categories
	const fetchCategories = async () => {
		console.log("Fetching categories...");
		await fetchAllCategories()
			.then((res) => {
				console.log(res.data?.getAllCategories);
				if (res.data?.getAllCategories) setCategories(res.data?.getAllCategories);
			})
			.catch((err) => {
				console.error("Error fetching categories: ", err);
			});
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="min-h-[65dvh] py-20 scroll-mt-20 overflow-hidden mx-5" id="courses">
			<div className="animate__fadeInUp animate__animated">
				<div className="flex justify-center text-center items-center">
					<h1 className="text-lg sm:text-xl md:text-3xl max-w-3xl" style={{ fontFamily: "Days One" }}>
						Get access to 5M+ and still Counting <span className="text-[#FFB100]">Cöurses</span> in
						different field of your choice for free
					</h1>
				</div>

				<CoursesNav
					activeCourseType={activeCourseType}
					setActiveCategoryIndex={setActiveCategoryIndex}
					setActiveCourseType={setActiveCourseType}
					courseTypes={courseTypes}
				/>

				<div className="relative w-full pr-20 flex items-center justify-start gap-6 mt-10 mx-10 text-sm whitespace-nowrap overflow-x-auto py-6">
					{categories.length >= 1 &&
						categories
							.map((category, indx) => {
								return (
									<div
										key={indx}
										onClick={() => setActiveCategoryIndex(indx)}
										className={`cursor-pointer duration-300 p-1 animate__animated font-medium animate__fadeInUp font-sm ${
											currentCategory === category.title ? "text-[#033]" : "text-[#888]"
										}`}>
										{category.title}
									</div>
								);
							})
							.slice(0, 5)}

					<Link href="/courses" prefetch={false}>
						<div className="tracking-tight text-[#33AC15] group cursor-pointer lg:block hidden">
							<div className="relative flex items-center gap-1">
								View All
								<span className="absolute h-[2px] duration-300 w-0 group-hover:left-0 right-0 group-hover:w-full -bottom-2 bg-[#33AC15]" />
								<div className="flex">
									<ChevronForwardSharp color="#33AC15" height="15px" width="15px" />
									<ChevronForwardSharp color="#33AC15" height="15px" width="15px" />
									<ChevronForwardSharp color="#33AC15" height="15px" width="15px" />
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className="md:border md:mx-10 md:p-5 bg-[#FDFDFD]">
					<CoursesList activeCourseType={activeCourseType.name} activeCategory={currentCategory} />
				</div>
			</div>
		</div>
	);
};

export default HomepageCourseSection;
