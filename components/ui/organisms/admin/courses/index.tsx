import React, { Fragment, useState } from "react";
import { ICourse } from "../../../../../interfaces";
import mentors from "../../../../../data/mentors";
import { CustomTrashBin, CustomRocket } from "../../../atom/icons/video";
import { useRouter } from "next/router";
import { formatAmount } from "../../../../../utils";
import { Select } from "../../../atom/inputs/Select";
import { Filter } from "react-ionicons";
import { fetchAllCourses } from "../../../../../services/api";

type OrderType = "asc" | "desc";

const AdminCoursesManagement = () => {
	const filter: string[] = ["all-courses", "date-created"];
	const [currentFilter, setCurrentFilter] = useState<string>(filter[0]);
	const [order, setOrder] = useState<OrderType>("desc");

	return (
		<div className="relative">
			{/* Top Header Section */}
			<div className="mb-10 flex justify-between items-center w-full">
				{/* <p className="text-sm text-zinc-500">All Courses ({formatAmount(coursesRecord.length)}) </p> */}
				{/* Filter Section */}
				<div className="flex items-center">
					<div
						onClick={() => {
							setOrder((p) => (p == "asc" ? "desc" : "asc"));
						}}
						title="Sort in ascending or descending order"
						className="bg-[#70C5A1] p-1.5 px-3 flex justify-center items-center cursor-pointer">
						<Filter color="#fff" cssClasses={`duration-300 ${order == "asc" ? "rotate-[180deg]" : ""}`} />
					</div>
					<Select<string>
						htmlTitle="Select filter"
						data={filter}
						label={currentFilter.split("-").join(" ")}
						handleSelected={(val) => {
							setCurrentFilter(val);
						}}
						newClassName="w-auto h-full border border-[#70C5A1] inline-block px-8 p-2 text-center relative cursor-pointer"
						showIcon={false}
					/>
				</div>
			</div>
			{/* Table Section */}
			<table className="w-full text-sm text-left rtl:text-right">
				<TableHead />
				<tbody className="">
					{/* {coursesRecord.map((course, index) => {
						return (
							<Fragment>
								<br />
								<TableItem key={index} {...{ course }} />
							</Fragment>
						);
					})} */}
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
			<td className="px-6 py-4 text-xs">{course.created_at?.split("/").join("-")}</td>
			<td className="px-6 py-4 text-xs">
				<div className="flex items-center gap-1">
					<img src="/assets/images/avatar.png" alt="" className="w-5 h-5" />
					<p className="text-xs">
						{course.mentor?.user.name.split(" ")[0]}{" "}
						{course.mentor?.user.name.split(" ")[1].slice(0, 8) + "..."}
					</p>
				</div>
			</td>
			<td className="px-6 py-4 text-xs">
				{course.price === 0 ? "Free" : "₦" + formatAmount(Number(course.price))}
			</td>
			{/* <td className="px-6 py-4 text-xs">20</td> */}
			<td className="px-6 py-4 text-xs capitalize">{course.course_type}</td>
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
				{/* <th scope="col" className="px-6 py-3 font-normal">
					Students
				</th> */}
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
