import React, { useMemo, useState } from "react";
import CoursesNav from "./CoursesNav";
import { courseTypes } from "../../../../../data/courses";
import { ChevronForwardSharp } from "react-ionicons";
import Link from "next/link";
import CoursesList from "./CoursesList";
import { CourseType, ICourseCategory } from "../../../../../interfaces";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../services/graphql/mutations/courses";
import { slugify } from "../../../../../utils";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

const HomepageCourseSection = () => {
	const [activeCourseType, setActiveCourseType] = useState<ActiveCourseType>(courseTypes[0]);
	const [currentCategory, setCurrentCategory] = useState<string>("");

	const { data, loading, error } = useQuery<{ getAllCategories: ICourseCategory[] }, any>(GET_ALL_CATEGORIES, {
		variables: {
			courseType: activeCourseType.name,
		},
	});

	const categories = useMemo(() => {
		if (!loading) {
			if (error) {
				console.error({ error: error });
				return [];
			} else if (data && data.getAllCategories && data.getAllCategories.length) {
				setCurrentCategory(data.getAllCategories[0].title);
				return data.getAllCategories;
			}
			return [];
		}
	}, [data, loading]);

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
					setActiveCourseType={setActiveCourseType}
					courseTypes={courseTypes}
				/>

				<div className="relative w-full sm:pr-20 flex items-center justify-start gap-6 mt-5 sm:mx-10 text-sm whitespace-nowrap overflow-x-auto py-4">
					{loading
						? Array.from({ length: 3 }).map((_, i) => {
								return <span className="p-0.5 px-8 bg-gray-200" key={i} />;
						  })
						: categories &&
						  categories.length >= 1 &&
						  categories
								.map((category, indx) => {
									return (
										<div
											key={indx}
											onClick={() => setCurrentCategory(category.title)}
											className={`cursor-pointer duration-300 p-1 animate__animated font-medium animate__fadeIn font-sm ${
												currentCategory === category.title ? "text-[#033]" : "text-[#888]"
											}`}>
											{category.title}
										</div>
									);
								})
								.slice(0, 5)}

					<Link
						href={
							categories && categories.length >= 1
								? `/courses?type=${slugify(activeCourseType.name)}`
								: "/courses"
						}
						prefetch={false}>
						<div className="tracking-tight text-[#33AC15] group cursor-pointer lg:block hidden">
							<div className="relative flex items-center gap-1">
								{categories &&
									(categories.length >= 1 ? "View All" : categories?.length < 1 && "Related Courses")}
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
				<div className="md:border md:mx-6 md:p-3 bg-[#FDFDFD]">
					<CoursesList activeCourseType={activeCourseType.name} activeCategory={currentCategory} />
				</div>
			</div>
		</div>
	);
};

export default HomepageCourseSection;
