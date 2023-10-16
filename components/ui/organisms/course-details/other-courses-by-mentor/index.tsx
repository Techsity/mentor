import React, { useState } from "react";
import { ICourse, IMentor } from "../../../../../interfaces";

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
	return mentorState ? (
		<div className="px-5 sm:px-10 lg:px-20 mt-10 py-3">
			<h1 className="text-xl font-semibold">Other Courses by Mentor</h1>
			<div className="overflow-hidden">
				{/* <div className="">{mentorState}</div> */}
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default OtherCoursesByMentor;
