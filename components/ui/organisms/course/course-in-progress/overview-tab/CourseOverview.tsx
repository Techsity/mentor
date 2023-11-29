import React from "react";

const CourseOverview = ({ overview }: { overview: string }) => {
	return (
		<>
			<p className="animate__animated animate__fadeIn text-sm text-[#9A9898] font-[300]">
				{overview}
				{overview}
				{overview}
				{overview}
			</p>
		</>
	);
};

export default CourseOverview;
