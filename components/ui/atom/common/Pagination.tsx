import React from "react";
import classNames from "classnames";
import { ChevronBack, ChevronForward } from "react-ionicons";

const Pagination = ({
	array,
	currentPage,
	paginate,
	loading,
	length = 3,
}: {
	array: any[];
	currentPage: number;
	paginate: (index: number) => void;
	loading?: boolean;
	length?: number;
}) => {
	return (
		<div className="flex items-center justify-between max-w-xs mx-auto flex-wrap py-5 pb-10">
			<ChevronBack
				color="#094B10"
				cssClasses="cursor-pointer"
				onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
			/>
			{Array.from({ length: length <= array.length - 3 ? length : 3 })
				.map((_, index) => {
					const id = index + 1;
					return (
						<div
							key={index}
							className={classNames(
								"cursor-pointer duration-300 p-1 px-3 text-sm text-center flex items-center justify-center",
								currentPage === id ? "bg-[#eee]" : currentPage > id ? "bg-[#eee]" : "hover:bg-[#ddd]",
								loading && "bg-[#ddd]",
							)}
							onClick={() => paginate(currentPage > id ? currentPage : id)}>
							{!loading
								? id === length
									? `${
											currentPage === array.length
												? "..."
												: currentPage > id
												? "..." + currentPage
												: id + "..."
									  }`
									: id
								: ""}
						</div>
					);
				})
				.slice(0, 5)}
			<div
				className={classNames(
					"cursor-pointer duration-300 p-1 px-3 text-sm text-center flex items-center justify-center",
					currentPage === array.length ? "bg-[#eee]" : "hover:bg-[#ddd]",
					loading && "bg-[#ddd]",
				)}
				onClick={() => {
					paginate(array.length);
				}}>
				{!loading && array.length}
			</div>
			<ChevronForward
				color="#094B10"
				cssClasses="cursor-pointer"
				onClick={() => paginate(currentPage < array.length ? currentPage + 1 : array.length)}
			/>
		</div>
	);
};
export default Pagination;
