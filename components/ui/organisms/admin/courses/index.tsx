import React, { Fragment } from "react";
import { ICourse } from "../../../../../interfaces";
import mentors from "../../../../../data/mentors";
import { CustomTrashBin, CustomRocket } from "../../../atom/icons/video";
import { useRouter } from "next/router";

const AdminCoursesManagement = () => {
	const coursesRecord: Partial<ICourse>[] = [
		{
			title: "Digital Marketing for beginners",
			created_at: new Date().toLocaleString(),
			mentor: mentors[1],
			price: 0,
			rating: 4.2,
			course_type: "technical",
		},
		{
			title: "Digital Marketing for beginners",
			created_at: new Date().toLocaleString(),
			mentor: mentors[1],
			price: 0,
			rating: 4.2,
			course_type: "technical",
		},
		{
			title: "Digital Marketing for beginners",
			created_at: new Date().toLocaleString(),
			mentor: mentors[1],
			price: 0,
			rating: 4.2,
			course_type: "technical",
		},
		{
			title: "Digital Marketing for beginners",
			created_at: new Date().toLocaleString(),
			mentor: mentors[1],
			price: 0,
			rating: 4.2,
			course_type: "technical",
		},
	];
	return (
		<div className="relative">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
				<TableHead />
				<tbody className="">
					{coursesRecord.map((course, index) => {
						return (
							<Fragment>
								<br />
								<TableItem key={index} {...{ course }} />
							</Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const TableItem = ({ course }: { course: Partial<ICourse> }) => {
	const router = useRouter();
	return (
		<tr className="bg-white border border-[#AEF4D6] hover:bg-[#AEF4D62A] w-full duration-300 cursor-default">
			<th
				scope="row"
				// Todo:
				// onClick={()=>router.push(`/courses/${course.id}`)}
				onClick={() => router.push(router.asPath)}
				className="px-4 py-4 text-xs font-normal whitespace-nowrap cursor-pointer hover:underline">
				{course.title?.slice(0, 12) + "..."}
			</th>
			<td className="px-6 py-4 text-xs">Silver</td>
			<td className="px-6 py-4 text-xs">Laptop</td>
			<td className="px-6 py-4 text-xs">$2999</td>
			<td className="px-6 py-4 text-xs">3.0 lb.</td>
			<td className="px-6 py-4 text-xs">3.0 lb.</td>
			<td className="px-10 py-4 w-full flex items-center justify-between gap-5 text-xs">
				<span className="flex justify-start">
					<CustomTrashBin className="cursor-pointer" />
				</span>
				<span className="flex justify-start">
					<CustomRocket className="cursor-pointer" />
				</span>
				<span className="flex justify-start">
					<p className="">4.2</p>
				</span>
			</td>
		</tr>
	);
};

const TableHead = () => {
	return (
		<thead className="text-xs text-[#A3A6A7] captalize">
			<tr>
				<th scope="col" className="px-3 pr-6 py-3 font-normal">
					Course Title
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Date Created
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Created by
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Price
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Students
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Course Type
				</th>
				<th
					scope="col"
					className="text-[#70C5A1] px-6 py-3 font-normal flex justify-between items-center gap-5 w-full text-xxs">
					<span className="">Delete</span>
					<span className="">Boost</span>
					<span className="">Ratings</span>
				</th>
			</tr>
		</thead>
	);
};

export default AdminCoursesManagement;
