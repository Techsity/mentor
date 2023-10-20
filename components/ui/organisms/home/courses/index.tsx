// Still need to be cleaned up

import React, { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import CoursesNav from "./CoursesNav";
import courses from "../../../../../data/courses";
import { ChevronForwardSharp } from "react-ionicons";
import Link from "next/link";
import CoursesList from "./CoursesList";

const HomepageCourseSection = () => {
	const links: string[] = ["Technical", "Vocational", "Educational"];
	const [activeLink, setActiveLink] = useState<string>(links[0]);
	const [activeCategory, setActiveCategory] = useState<string>(
		courses.filter((course) => course.section === activeLink)[0]
			? courses.filter((course) => course.section === activeLink)[0]
					.categories[0].title
			: "",
	);

	return (
		<div
			className="min-h-screen py-20 scroll-mt-20 overflow-hidden mx-5"
			id="courses">
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="flex justify-center text-center items-center">
					<h1
						className="text-lg sm:text-xl md:text-3xl max-w-3xl"
						style={{ fontFamily: "Days One" }}>
						Get access to 5M+ and still Counting{" "}
						<span className="text-[#FFB100]">Cöurses</span> in
						different field of your choice for free
					</h1>
				</div>

				<CoursesNav
					links={links}
					activeLink={activeLink}
					setActiveLink={(link) => {
						setActiveLink(link);
						setActiveCategory(
							courses.filter(
								(course) => course.section === link,
							)[0]
								? courses.filter(
										(course) => course.section === link,
								  )[0].categories[0].title
								: "",
						);
					}}
				/>
				{courses.filter(
					(course) => course.section === activeLink,
				)[0] ? (
					<>
						<div className="relative w-full pr-20 flex items-center justify-start gap-6 mt-10 mx-10 text-sm whitespace-nowrap overflow-x-auto py-6">
							{courses
								.filter(
									(course) => course.section === activeLink,
								)[0]
								.categories.map((category, indx) => {
									return (
										<div
											key={indx}
											onClick={() =>
												setActiveCategory(
													category.title,
												)
											}
											className={`cursor-pointer duration-300 p-1 animate__animated animate__fadeInUp ${
												activeCategory ===
												category.title
													? "font-semibold"
													: ""
											}`}>
											{category.title}
										</div>
									);
								})
								.slice(0, 6)}
							<Link href="#">
								<div className="absolute top-6 right-32 tracking-tight text-[#33AC15] group cursor-pointer md:block hidden">
									<div className="relative flex items-center gap-2">
										View All{" "}
										<span className="absolute h-[2px] duration-300 w-0 group-hover:left-0 right-0 group-hover:w-full -bottom-2 bg-[#33AC15]" />
										<div className="flex">
											<ChevronForwardSharp
												color="#33AC15"
												height="15px"
												width="15px"
											/>
											<ChevronForwardSharp
												color="#33AC15"
												height="15px"
												width="15px"
											/>
											<ChevronForwardSharp
												color="#33AC15"
												height="15px"
												width="15px"
											/>
										</div>
									</div>
								</div>
							</Link>
						</div>
						<CoursesList
							activeLink={activeLink}
							activeCategory={activeCategory}
						/>
					</>
				) : null}
			</AnimationOnScroll>
		</div>
	);
};

export default HomepageCourseSection;
