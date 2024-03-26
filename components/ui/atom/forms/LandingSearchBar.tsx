import React, { FormEvent } from "react";
import { SearchSharp } from "react-ionicons";

const LandingSearchBar = () => {
	function handleSearch(e: FormEvent) {
		e.preventDefault();
		// console.log();
	}

	return (
		<form
			onSubmit={handleSearch}
			className="bg-white px-5 w-auto border-2 p-2 rounded-full relative focus-within:border-[#70C5A1] duration-300">
			<input
				type="search"
				className="bg-transparent outline-none pr-5 w-full h-full font-normal text-xsm focus:ring-0"
				placeholder="Search for a course, event, or mentor"
			/>
			<button type="submit" className="absolute group right-2 top-2 duration-300 cursor-pointer">
				<div className="group-hover:hidden flex">
					<SearchSharp color={"#DFDFDF"} />
				</div>
				<div className="group-hover:flex hidden">
					<SearchSharp color={"#70C5A1"} />
				</div>
			</button>
		</form>
	);
};

export default LandingSearchBar;
