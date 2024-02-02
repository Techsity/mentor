import React, { useEffect, useMemo, useState } from "react";
import { ICourse } from "../../../../../interfaces";
import { CustomTrashBin, CustomRocket } from "../../../atom/icons/video";
import { useRouter } from "next/router";
import { formatAmount } from "../../../../../utils";
import { Select } from "../../../atom/inputs/Select";
import { Filter } from "react-ionicons";
import * as API from "../../../../../services/api";
import { ParsedUrlQuery } from "querystring";

type OrderType = "asc" | "desc";

const AdminCoursesManagement = ({ serverQuery, ...props }: { serverQuery: ParsedUrlQuery; props?: any }) => {
	const router = useRouter();

	const filter: string[] = ["all-courses", "date-created"];
	const [currentFilter, setCurrentFilter] = useState<string>(filter[0]);
	const [order, setOrder] = useState<OrderType>("desc");
	const [coursesRecord, setCoursesRecord] = useState<Partial<ICourse>[]>([]);
	const [pagination, setPagination] = useState<{ limit: number; skip: number }>({
		limit: Number(serverQuery.limit) || 10,
		skip: Number(serverQuery.skip) || 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { limit, skip } = pagination;

	const pages = useMemo(() => {
		return Math.ceil(coursesRecord.length / pagination.limit);
	}, [coursesRecord, limit, skip]);

	const fetchAllCourses = async () => {
		setLoading(true);
		try {
			const data = await API.fetchAllCourses({ limit, skip });
			setCoursesRecord(data);
		} catch (err) {
			console.error("Error fetching all courses: ", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllCourses();
	}, [pagination]);

	return (
		<div className="relative">
			{/* Top Header Section */}
			<div className="mb-10 flex justify-between items-center w-full">
				<p className="text-sm text-zinc-500">All Courses ({formatAmount(coursesRecord.length) || "0"}) </p>
				{/* Filter Section */}
				<div className="flex items-center">
					<div
						onClick={() => {
							setOrder((p) => (p == "asc" ? "desc" : "asc"));
						}}
						title="Sort in ascending or descending order"
						className="bg-[#70C5A1] p-1.5 px-3 flex justify-center items-center cursor-pointer">
						<Filter
							title={order.charAt(0).toUpperCase() + order.slice(1)}
							color="#fff"
							cssClasses={`duration-300 ${order == "asc" ? "rotate-[180deg]" : ""}`}
						/>
					</div>
					<Select<string>
						htmlTitle="Select filter"
						data={filter}
						label={currentFilter.split("-").join(" ")}
						handleSelected={(val) => {
							setCurrentFilter(val);
						}}
						newClassName="w-[180px] h-full border border-[#70C5A1] inline-block px-10 p-2 text-center relative cursor-pointer"
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
			<div className="flex gap-4 items-center justify-center">
				dfed
				{loading ? "loading" : "not loading"}
				{limit}
				{JSON.stringify({ serverQuery })}
				{JSON.stringify({ props })}
				{Array.from({ length: pages }).map((_, index) => {
					const id = index + 1;
					return (
						<div
							key={index}
							className="cursor-pointer"
							onClick={() => {
								setPagination((p) => {
									return { limit: p.limit * id, skip: p.skip * id };
								});
							}}>
							{id}
						</div>
					);
				})}
			</div>
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
					className="text-[#70C5A1] px-6 py-3 font-normal flex justify-between items-center gap-5 w-full text-xs">
					<span className="">Delete</span>
					<span className="">Boost</span>
					<span className="">Ratings</span>
				</th>
			</tr>
		</thead>
	);
};

export default AdminCoursesManagement;
