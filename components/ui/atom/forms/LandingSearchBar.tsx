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
      className="bg-white px-5 w-[455px] border-2 p-2 rounded-full relative"
    >
      <input
        type="search"
        className="bg-transparent outline-none pr-5 focus:ring-0 w-full h-full font-normal text-xsm"
        placeholder="Search for a course, event, or mentor"
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
