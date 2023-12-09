import React, { useState } from "react";
import Link from "next/link";
import { slugify } from "../../../../../../utils";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { IMentor } from "../../../../../../interfaces/mentor.interface";
import { ICourse } from "../../../../../../interfaces";

const OtherCoursesByMentor = ({
	mentorProfile = false,
	course,
	mentor,
}: {
	mentorProfile?: boolean;
	course?: ICourse;
	mentor?: IMentor;
}) => {
	const [mentorState, setMentorState] = useState<IMentor | null>(course ? course.mentor : mentor ? mentor : null);

	return mentorState ? (
		<div className="px-5 sm:px-10 lg:pl-20 mt-10 py-3">
			<h1 className="text-xl font-semibold">{mentorProfile ? "Courses by Mentor" : "Other Courses by Mentor"}</h1>
			{mentorState.courses.length > 0 ? (
				<div className="flex flex-row items-center overflow-x-scroll gap-3 hide-scroll-bar py-10 relative">
					<div className="flex flex-nowrap flex-row gap-4 snap-x snap-mandatory">
						{mentorState.courses
							// .filter(
							// 	(item) =>
							// 		{slugify(item.title) !==
							// 		slugify(course.title)}
							// )
							.map((course, index) => <DisplayCourseCard course={course} key={index} />)
							.slice(0, mentorProfile ? mentorState.courses.length : 4)}
					</div>
					{mentorProfile ? null : (
						<div className="sticky right-0 z-20 w-52 p-3 pr-0 h-full xl:h-[500px] h-[60dvh] md:h-[485px] backdrop-blur-sm bg-white/30">
							<Link href={`/mentors/${mentorState.user.name}`}>
								<div className="w-full h-full bg-[#70C5A1] p-5 md:p-10 flex flex-col items-center justify-center text-white cursor-pointer select-none">
									View Mentor&apos;s Profile
									<svg width="83" height="15" viewBox="0 0 63 12" fill="none">
										<path
											d="M62.5303 6.53033C62.8232 6.23744 62.8232 5.76256 62.5303 5.46967L57.7574 0.696699C57.4645 0.403806 56.9896 0.403806 56.6967 0.696699C56.4038 0.989593 56.4038 1.46447 56.6967 1.75736L60.9393 6L56.6967 10.2426C56.4038 10.5355 56.4038 11.0104 56.6967 11.3033C56.9896 11.5962 57.4645 11.5962 57.7574 11.3033L62.5303 6.53033ZM0 6.75H62V5.25H0V6.75Z"
											fill="white"
										/>
									</svg>
								</div>
							</Link>
						</div>
					)}
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
