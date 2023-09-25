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
			className="bg-white px-5 w-full border-2 p-2 rounded-full relative"
		>
			<input
				type="search"
				className="bg-transparent outline-none pr-5 focus:ring-0 w-full h-full"
				placeholder="Search"
			/>
			<div className="absolute group right-2 top-2 duration-300 cursor-pointer">
				<div className="group-hover:hidden flex">
					<SearchSharp color={"#DFDFDF"} />
				</div>
				<div className="group-hover:flex hidden">
					<SearchSharp color={"#111"} />
				</div>
			</div>
		</form>
	);
};

export default LandingSearchBar;
