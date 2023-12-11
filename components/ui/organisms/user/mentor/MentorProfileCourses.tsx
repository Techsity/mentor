import React, { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import courses from "../../../../../data/courses";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import MentorUploadedCourses from "./MentorUploadedCourses";

const MentorProfileCourses = () => {
	const mentorCourses = useMemo(() => courses, []);

	const [active, setActive] = useState<"registered" | "uploaded">("registered");

	return (
		<>
			<NavSection {...{ active, setActive }} />
			{active === "registered" ? (
				<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 items-center animate__animated animate__fadeIn">
					{mentorCourses.map((course, i) => (
						<CourseInProgressDisplayCard {...{ course }} key={i} />
					))}
				</div>
			) : (
				active === "uploaded" && <MentorUploadedCourses />
			)}
		</>
	);
};

const NavSection: FC<{
	active: "registered" | "uploaded";
	setActive: Dispatch<SetStateAction<"registered" | "uploaded">>;
}> = ({ active, setActive }) => (
	<div className="flex items-center gap-3 mb-6 w-full text-sm">
		<div className="flex item-center flex-grow max-w-md">
			<div
				onClick={() => setActive("registered")}
				className={`w-full cursor-pointer select-none px-4 border p-3 text-center capitalize duration-300 ${
					active === "registered"
						? "bg-[#094B10] text-white"
						: "bg-transparent text-[#094B10] border-[#094B10] border-r-transparent"
				}`}>
				registered
			</div>
			<div
				onClick={() => setActive("uploaded")}
				className={`w-full cursor-pointer select-none px-4 border p-3 text-center capitalize duration-300 ${
					active === "uploaded"
						? "bg-[#094B10] text-white"
						: "bg-transparent text-[#094B10] border-[#094B10] border-l-transparent"
				}`}>
				uploaded
			</div>
		</div>
		<div className="text-[#70C5A1] capitalize select-none cursor-pointer font-medium">My drafts</div>
	</div>
);

export default MentorProfileCourses;
