import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { ICourse } from "../../../../../../interfaces";

const CourseRequirements = (course: ICourse) => {
	return (
		<div className="my-6">
			<div className="">
				<h1 className="font-semibold">Requirements before taking this course</h1>
				<p className="text-zinc-400 font-[300] max-w-2xl text-sm">
					Here are what are required of you to better your learning experience
				</p>
				<div className="grid lg:grid-cols-2 md:grid-cols-3 gap-3 my-6 max-w-2xl">
					{course.requirements.map((learn, i) => (
						<span className="flex items-center gap-2 break-words text-sm" key={i}>
							<svg width="11" height="10" viewBox="0 0 11 10" fill="none" className="">
								<path
									d="M3.61047 10L0 6.00386L1.64535 4.18275L3.61047 6.36422L9.35465 0L11 1.82111L3.61047 10Z"
									fill="#70C5A1"
								/>
							</svg>
							{learn}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default CourseRequirements;
