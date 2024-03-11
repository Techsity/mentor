import React, { FC, useMemo } from "react";
import { ICourse } from "../../../../../interfaces";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { newCourse } from "../../../../../redux/reducers/coursesSlice";

type Props = {
	state: Omit<ICourse, "mentor">;
};

const AddCourseContent: FC<Props> = ({ state }) => {
	const router = useRouter();
	const newCourseData = useSelector(newCourse);
	const isContentPage = Boolean(router.asPath.split("#")[2] as "content");

	const courseContents = useMemo(
		() =>
			newCourseData?.course_contents
				? newCourseData.course_contents
				: state.course_contents && state.course_contents,
		[state, newCourseData],
	);

	return (
		<div className="grid gap-4">
			<div className="flex justify-between items-center text-sm">
				<h1 className="">Course Content</h1>
				<div
					onClick={() => router.push(router.asPath + `/content`)}
					className="text-[#70C5A1] select-none cursor-pointer">
					+ Add New Content
				</div>
			</div>
			{/* Content */}
			<div className="grid gap-4">
				{courseContents.map((content, index) => {
					// const mainDuration = calculateTotalDuration(content);
					return (
						<div key={index} className="flex bg-[#70C5A1] p-3 items-center justify-between text-white">
							<div className="">
								<p className="text-sm">
									{content.title} - [{content.course_sections.length}{" "}
									{content.course_sections.length == 1 ? "outline" : "outlines"}]
								</p>
								{/* <span className="text-xs">{55}</span> */}
							</div>
							<div
								onClick={() => {
									!isContentPage && router.push(router.asPath + `/content`);
								}}
								className="text-sm select-none cursor-pointer">
								Edit
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AddCourseContent;
