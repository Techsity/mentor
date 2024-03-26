import React, { useMemo } from "react";
import DisplayCourseCard from "../../../../atom/cards/course/DisplayCourseCard";
import { IMentor } from "../../../../../../interfaces/mentor.interface";
import { ICourse } from "../../../../../../interfaces";
import { useRouter } from "next/router";

const OtherCoursesByMentor = ({
	mentorProfile = false,
	course,
	mentor,
}: {
	mentorProfile?: boolean;
	course?: ICourse;
	mentor?: IMentor;
}) => {
	const router = useRouter();

	const mentorState = useMemo(() => {
		return course ? course.mentor : mentor && mentor;
	}, [mentor, course]);

	const mentorCourses = useMemo(() => {
		return course ? course.mentor.courses.filter((c) => c.id !== course.id) : mentor && mentor.courses;
	}, [mentor, course]);

	return mentorState && mentorCourses && mentorCourses?.length > 0 ? (
		<div className="px-6 sm:px-12 mt-10 py-3">
			<h1 className="text-xl font-semibold capitalize">{!mentorProfile && "other "}courses by this mentor</h1>
			<div className="flex flex-row items-center overflow-x-scroll hide-scroll-bar py-10 relative">
				<div className="flex flex-nowrap flex-row gap-4 snap-x snap-mandatory">
					{mentorCourses
						.map((course, index) => {
							return <DisplayCourseCard course={course} key={index} />;
						})
						.slice(0, mentorProfile ? mentorCourses.length : 4)}
				</div>
				{!mentorProfile && (
					<div className="sticky right-0 z-20 w-40 p-3 pr-0 h-full backdrop-blur-sm bg-white/30">
						<div
							onClick={() => router.push(`/mentors/${mentorState.id}`)}
							className="w-full h-full bg-[#70C5A1] p-5 md:p-10 flex flex-col items-start justify-center text-white cursor-pointer select-none min-h-[50dvh]">
							View Mentor&apos;s Profile
							<svg width="83" height="15" viewBox="0 0 63 12" fill="none">
								<path
									d="M62.5303 6.53033C62.8232 6.23744 62.8232 5.76256 62.5303 5.46967L57.7574 0.696699C57.4645 0.403806 56.9896 0.403806 56.6967 0.696699C56.4038 0.989593 56.4038 1.46447 56.6967 1.75736L60.9393 6L56.6967 10.2426C56.4038 10.5355 56.4038 11.0104 56.6967 11.3033C56.9896 11.5962 57.4645 11.5962 57.7574 11.3033L62.5303 6.53033ZM0 6.75H62V5.25H0V6.75Z"
									fill="white"
								/>
							</svg>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default OtherCoursesByMentor;
