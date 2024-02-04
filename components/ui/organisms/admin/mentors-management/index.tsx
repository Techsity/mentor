import * as FlagIcons from "react-country-flags-select";
import React, { useEffect, useMemo, useState } from "react";
import { IWorkshop } from "../../../../../interfaces";
import { CustomTrashBin, CustomRocket, RestrictIcon } from "../../../atom/icons/video";
import { useRouter } from "next/router";
import { formatAmount } from "../../../../../utils";
import { Select } from "../../../atom/inputs/Select";
import { Filter } from "react-ionicons";
import { useAllWorkshops } from "../../../../../hooks/admin/admin-resources";
import { ParsedUrlQuery } from "querystring";
import Pagination from "../../../atom/common/Pagination";
import classNames from "classnames";
import mentors from "../../../../../data/mentors";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import countries from "../../../../../data/countries";
import CountrySelectorComp from "../../../atom/inputs/CountrySelector";
import { IUser } from "../../../../../interfaces/user.interface";

const AdminMentorsManagement = ({ serverQuery, ...props }: { serverQuery?: ParsedUrlQuery; props?: any }) => {
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
									<TableItem loading={loading} key={index} {...{ mentor: {} }} />
								</>
							);
						})
					) : (
						<>
							{/* {workshops.length > 0 ? (
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
							)} */}
							<TableItem mentor={mentors[0]} />
						</>
					)}
				</tbody>
			</table>
			<Pagination {...{ array: mentors, currentPage, loading, paginate }} />
		</div>
	);
};

const TableItem = ({ mentor, loading }: { mentor: Partial<IMentor>; loading?: boolean }) => {
	const router = useRouter();
	const country: string = countries.find((c) => c.countryCode === mentor.user?.country)?.countryCode as string;

	interface IconType {
		[key: string]: React.ElementType;
	}
	const IconComponent: IconType = FlagIcons;

	const IconComp: any = country ? (
		IconComponent[country.charAt(0).toUpperCase() + country.charAt(1).toLowerCase()] ||
		IconComponent[
			(mentor.user as IUser).country.charAt(0).toUpperCase() +
				(mentor.user as IUser).country.charAt(1).toLowerCase()
		]
	) : (
		<></>
	);

	return (
		<tr className="bg-white border border-[#AEF4D6] hover:bg-[#AEF4D62A] w-full duration-300 cursor-default">
			<td scope="row" className="p-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && (
					<div className="flex items-center gap-1">
						<img src="/assets/images/avatar.png" alt="" className="w-5 h-5" />
						<p className="text-xs">
							{mentor?.user?.name.split(" ")[0]}{" "}
							{mentor?.user?.name &&
								mentor?.user?.name.split(" ").length >= 1 &&
								mentor?.user?.name.split(" ")[1] &&
								mentor?.user?.name.split(" ")[1].slice(0, 8) + "..."}
						</p>
					</div>
				)}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && mentor.created_at} {"20-12-2024"}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && IconComp && <IconComp width="25px" height="25px" />}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && <>12k</>}
			</td>
			<td className="px-6 py-4 text-xs">
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				{!loading && <>12k</>}
			</td>
			<td className={classNames("")}>
				{loading && (
					<span className="p-1 w-full flex bg-zinc-200 animate__animated animate__fadeIn animate__infinite" />
				)}
				18k
			</td>
			<td className="px-10 py-4 w-full flex items-center justify-between gap-5 text-xs">
				<span className="flex justify-start">
					<CustomTrashBin className="cursor-pointer" />
				</span>
				<span className="flex justify-start">
					<RestrictIcon className="cursor-pointer" />
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
					Mentor
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Joined
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Country
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Sessions
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Courses
				</th>
				<th scope="col" className="px-6 py-3 font-normal">
					Workshops
				</th>
				<th
					scope="col"
					className="text-[#70C5A1] px-6 py-3 font-normal flex justify-between items-center gap-5 w-full text-xs">
					<span className="">Remove</span>
					<span className="">Restrict</span>
					<span className="">Ratings</span>
				</th>
			</tr>
		</thead>
	);
};

export default AdminMentorsManagement;
