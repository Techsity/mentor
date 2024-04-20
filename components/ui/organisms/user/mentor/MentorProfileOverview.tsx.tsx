import React from "react";
import { formatAmount } from "../../../../../utils";

const MentorProfileOverview = () => {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="">
				<div className="text-white bg-[#70C5A1] p-6 md:max-w-[35%] xs:max-w-[40%]">
					<div className="text-sm">Total Earnings on Mentor</div>
					<p className="font-semibold text-3xl">${formatAmount(200000)}</p>
				</div>
			</div>

			<div className="grid xs:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-3 w-full">
				{categoriesStats.map((item, index) => {
					return (
						<div
							key={index}
							className="text-[#A3A6A7] bg-white p-6 border hover:border-[#70C5A1] border-[#EEEEEE] duration-300 hover:shadow-lg cursor-default">
							<div className="text-sm text-[#D0D0D0]">{item.title}</div>
							<p className="font-semibold text-3xl">{formatAmount(item.value)}</p>
						</div>
					);
				})}
			</div>
			<div className="grid xs:grid-cols-2 2xl:grid-cols-3 gap-3 w-full mt-4">
				{totalStats.map((item, index) => {
					return (
						<div
							key={index}
							className="text-[#A3A6A7] bg-white p-6 hover:border-[#70C5A1] border border-[#EEEEEE] duration-300 hover:shadow-lg cursor-default">
							<div className="text-sm text-[#D0D0D0]">{item.title}</div>
							<p className="font-semibold text-3xl flex gap-1 items-center">
								{formatAmount(item.value)}
								{item.measure && <span className="text-sm">{item.measure}</span>}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MentorProfileOverview;

const categoriesStats: { title: string; value: number }[] = [
	{ title: "Registered Courses", value: 20 },
	{ title: "Completed Courses", value: 10 },
	{ title: "Courses Created", value: 15 },
	{ title: "Courses in Draft", value: 2 },
	{ title: "Registered Workshop", value: 20 },
	{ title: "Attended Workshop", value: 14 },
	{ title: "Upcoming", value: 6 },
	{ title: "My Workshop", value: 4 },
	{ title: "Mentors Session", value: 8 },
	{ title: "Pending Mentor Session", value: 10 },
	{ title: "Mentee Session", value: 15 },
	{ title: "Pending Mentee Session", value: 2 },
];
const totalStats: { title: string; value: number; measure?: string }[] = [
	{ title: "Total Courses Watch Hours", value: 4000, measure: "hrs" },
	{ title: "Total Students", value: 450000 },
	{ title: "Total Workshop Participants", value: 400 },
];
