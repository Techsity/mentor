import React, { FC } from "react";
import { ICourse } from "../../../../../interfaces";
import { useRouter } from "next/router";

type Props = {
	state: Omit<ICourse, "mentor">;
};

const AddCourseContent: FC<Props> = ({ state }) => {
	const router = useRouter();
	const isContentPage = Boolean(router.asPath.split("#")[2] as "content");

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
				{state.course_contents.map((content, index) => {
					// const mainDuration = calculateTotalDuration(content);
					return (
						<div key={index} className="flex bg-[#70C5A1] p-3 items-center justify-between text-white">
							<div className="">
								<p className="text-sm">{content.title}</p>
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
