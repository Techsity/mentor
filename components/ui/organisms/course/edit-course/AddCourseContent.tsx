import React, { FC } from "react";
import { ICourse } from "../../../../../interfaces";
import { calculateTotalDuration } from "../../../../../utils";

type Props = {
	state: Omit<ICourse, "mentor">;
};

const AddCourseContent: FC<Props> = ({ state }) => {
	return (
		<div className="grid gap-4">
			<div className="flex justify-between items-center text-sm">
				<h1 className="">Course Content</h1>
				<div className="text-[#70C5A1] select-none cursor-pointer">
					+ Add New Content
				</div>
			</div>
			{/* Content */}
			<div className="grid gap-4">
				{state.content.map((content, index) => {
					const mainDuration = calculateTotalDuration(content);
					return (
						<div
							key={index}
							className="flex bg-[#70C5A1] p-3 items-center justify-between text-white">
							<div className="">
								<p className="text-sm">{content.title}</p>
								<span className="text-xs">{mainDuration}</span>
							</div>
							<div className="text-sm select-none cursor-pointer">
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
