import React, { useEffect, useRef, useState } from "react";
import CoursesMentorsWorkshopNav from "./CoursesMentorsWorkshopNav";
import CoursesList from "../../../home/courses/CoursesList";
import DisplayCourseCard from "../../../../atom/cards/home/DisplayCourseCard";
import courses from "../../../../../../data/courses";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import CoursesSection from "./CoursesSection";
import WorkshopSection from "./WorkshopSection";
import MentorsSection from "./MentorsSection";

const CoursesMentorsWorkshop = () => {
	const links = ["Courses", "Workshops", "Mentors"];
	const [activeLink, setActiveLink] = useState<string>(links[0]);

	return (
		<div className="relative h-full">
			<div className="flex justify-end bg-[#EEFFF8] py-6 sticky top-24">
				<CoursesMentorsWorkshopNav
					links={links}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				/>
			</div>
			<div className="my-5 min-h-[50vh]">
				{activeLink === "Courses" ? (
					<CoursesSection />
				) : activeLink === "Workshops" ? (
					<WorkshopSection />
				) : activeLink === "Mentors" ? (
					<MentorsSection />
				) : null}
			</div>
		</div>
	);
};

export default CoursesMentorsWorkshop;
