import React, { useState } from "react";
import { ICourse, IMentor } from "../../../../../interfaces";
import DisplayCourseCard from "../../../atom/cards/home/DisplayCourseCard";

const OtherCoursesByMentor = ({
	course,
	mentor,
}: {
	course?: ICourse;
	mentor?: IMentor;
}) => {
	const [mentorState, setMentorState] = useState<IMentor | null>(
		course ? course.mentor : mentor ? mentor : null,
	);
	console.log(mentorState?.courses);

	return mentorState ? (
		<div className="px-5 sm:px-10 lg:px-20 mt-10 py-3">
			<h1 className="text-xl font-semibold">Other Courses by Mentor</h1>
			{mentorState.courses.length > 0 ? (
				<div className="flex flex-row overflow-x-scroll gap-3 hide-scroll-bar py-10">
					<div className="flex flex-nowrap flex-row gap-3 snap-x snap-mandatory">
						{mentorState.courses.map((course, index) => (
							<DisplayCourseCard course={course} key={index} />
						))}
					</div>
				</div>
			) : (
				<div className="min-h-[20dvh">No courses to display</div>
			)}
		</div>
	) : (
		<div></div>
	);
};

export default OtherCoursesByMentor;
