import React, { useEffect, useMemo, useState } from "react";
import { IWorkshop } from "../../../../../interfaces";
import { CustomTrashBin, CustomRocket } from "../../../atom/icons/video";
import { useRouter } from "next/router";
import { formatAmount } from "../../../../../utils";
import { Select } from "../../../atom/inputs/Select";
import { Filter } from "react-ionicons";
import { useAllWorkshops } from "../../../../../hooks/admin/admin-resources";
import { ParsedUrlQuery } from "querystring";
import Pagination from "../../../atom/common/Pagination";
import classNames from "classnames";

const AdminWorkshopsManagement = ({ serverQuery, ...props }: { serverQuery?: ParsedUrlQuery; props?: any }) => {
	const { changeOrder, order, paginate, currentFilter, loading, setCurrentFilter, workshops, currentPage } =
		useAllWorkshops({
			serverQuery,
		});

	return (
		<div className="relative">
			{/* Top Header Section */}
			<div className="mb-10 flex justify-between items-center w-full">
				<p className="text-sm text-zinc-500">All workshops ({formatAmount(workshops.length) || "0"}) </p>
				{/* Filter Section */}
				<div className="flex items-center">
					<div
						onClick={changeOrder}
						title="Sort in ascending or descending order"
						className="bg-[#70C5A1] p-1.5 px-3 flex justify-center items-center cursor-pointer">
						<Filter
							title={order.charAt(0).toUpperCase() + order.slice(1)}
							color="#fff"
							cssClasses={`duration-300 ${order == "asc" ? "rotate-[180deg]" : ""}`}
						/>
					</div>
					<Select<string>
						htmlTitle="Filter by status"
						data={["Completed", "Live", "Recordings", "Upcoming", "All"] as (IWorkshop["tag"] | "All")[]}
						label={currentFilter.split("-").join(" ")}
						handleSelected={(val: typeof currentFilter) => {
							setCurrentFilter(val);
						}}
						newClassName="w-[140px] h-full border border-[#70C5A1] inline-block px-10 p-2 text-center relative cursor-pointer"
						showIcon={false}
					/>
				</div>
			</div>
			{/* Table Section */}
			<table className="w-full text-sm text-left rtl:text-right">
				<TableHead />
				<tbody className="">
					{loading ? (
						Array.from({ length: 6 }).map((_, index) => {
							return (
								<>
									<br />
									<TableItem loading={loading} key={index} {...{ workshop: {} }} />
								</>
							);
						})
					) : (
						<>
							{workshops.length > 0 ? (
								workshops.map((workshop, index) => {
									return (
										<>
											<br />
											<TableItem loading={loading} key={index} {...{ workshop }} />
										</>
									);
								})
							) : (
								<div className="text-red-500 text-sm text-center my-5 flex justify-center items-center">
									No workshops found
								</div>
							)}
						</>
					)}
				</tbody>
			</table>
			<Pagination {...{ array: workshops, currentPage, loading, paginate }} />
		</div>
	);
};

const TableItem = ({ workshop, loading }: { workshop: Partial<IWorkshop>; loading?: boolean }) => {
	const router = useRouter();

	return (
		<tr className="bg-white border border-[#AEF4D6] hover:bg-[#AEF4D62A] w-full duration-300 cursor-default">
			<th
				scope="row"
				// Todo:
				// onClick={()=>router.push(`/workshops/${workshop.id}`)}
				onClick={() => router.push(router.asPath)}
				className="whitespace-nowrap px-4 py-4 text-xs font-normal cursor-pointer hover:underline">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && workshop.title?.slice(0, 12) + "..."}
			</th>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{/* {!loading && new Date().toLocaleString()?.split("/").join("-")} */}
				{!loading && "12-12-2023"}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && (
					<div className="flex items-center gap-1">
						<img src="/assets/images/avatar.png" alt="" className="w-5 h-5" />
						<p className="text-xs">
							{workshop.mentor?.user.name.split(" ")[0]}{" "}
							{workshop.mentor?.user.name &&
								workshop.mentor?.user.name.split(" ").length >= 1 &&
								workshop.mentor?.user.name.split(" ")[1] &&
								workshop.mentor?.user.name.split(" ")[1].slice(0, 8) + "..."}
						</p>
					</div>
				)}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading ? (workshop.price === 0 ? "Free" : "₦" + formatAmount(Number(workshop.price))) : null}
			</td>
			{/* <td className="px-6 py-4 text-xs">20</td> */}
			{/* && */}
			<td
				className={classNames(
					"px-6 py-4 text-xs capitalize",
					!loading
						? workshop.tag === "Live"
							? "text-[#F6937B]"
							: workshop.tag === "Upcoming"
							? "text-[#FFB100]"
							: workshop.tag === "Completed"
							? "text-[#078661]"
							: "text-[#ccc]"
						: "",
				)}>
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && workshop.tag}
			</td>
			<td className="px-10 py-4 w-full flex items-center justify-between gap-5 text-xs">
				<span className="flex justify-start">
					<CustomTrashBin className="cursor-pointer" />
				</span>
				<span className="flex justify-start">
					{workshop.tag !== "Completed" && <CustomRocket className="cursor-pointer" />}
				</span>
				<span className="flex justify-start">
					{loading && (
						<span className="p-1 px-2.5 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
					)}
					{!loading && <p className="">4.2</p>}
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
					Title
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Created On
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Created By
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Price
				</th>
				{/* <th scope="col" className="px-6 py-3 font-normal">
					Students
				</th> */}
				<th scope="col" className="px-6 py-3 font-normal">
					Status
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

export default AdminWorkshopsManagement;
