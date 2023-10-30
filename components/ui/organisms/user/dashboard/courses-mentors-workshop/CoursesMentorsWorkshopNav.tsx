import React, { Dispatch, SetStateAction } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { FilterCircleSharp, FilterSharp } from "react-ionicons";
import { scrollUp } from "../../../../../../utils";

const CoursesMentorsWorkshopNav = ({
	activeLink,
	setActiveLink,
	links,
}: {
	links: string[];
	activeLink: string;
	setActiveLink: Dispatch<SetStateAction<string>>;
}) => {
	const FilterComponent = () => {
		return (
			<>
				<div className="hidden lg:flex items-center gap-4 text-[#094B10]">
					<h1 className="text-sm whitespace-nowrap">Filter By: </h1>
					<select className="border border-[#70C5A1] p-1 appearance-none relative hover:bg-[#DAFFEF] duration-300 px-4 focus:ring-0 outline-none cursor-pointer bg-transparent">
						<option className="" value="prices_all">
							All Prices
						</option>
						<option className="" value="prices_all">
							All Prices
						</option>
						<option className="" value="prices_all">
							All Prices
						</option>
					</select>
					<select className="border border-[#70C5A1] p-1 appearance-none relative hover:bg-[#DAFFEF] duration-300 px-4 focus:ring-0 outline-none cursor-pointer bg-transparent">
						<option className="" value="prices_all">
							All Topic
						</option>
						<option className="" value="prices_all">
							All Topic
						</option>
						<option className="" value="prices_all">
							All Topic
						</option>
					</select>
					<select className="border border-[#70C5A1] p-1 appearance-none relative hover:bg-[#DAFFEF] duration-300 px-4 focus:ring-0 outline-none cursor-pointer bg-transparent">
						<option className="" value="prices_all">
							Country
						</option>
						<option className="" value="prices_all">
							Country
						</option>
						<option className="" value="prices_all">
							Country
						</option>
					</select>
				</div>
				<div className="md:hidden sm:flex hidden">
					<FilterCircleSharp
						title="Filter by:"
						color="#094B10"
						cssClasses="cursor-pointer"
						height="35px"
						width="35px"
					/>
				</div>
			</>
		);
	};
	return (
		<div className="animate__animated animate__fadeInUp overflow-hidden flex lg:justify-end justify-center w-full sm:mr-10 lg:mr-20 gap-5 items-center">
			<div className="flex tracking-tight justify-center items-center select-none">
				{links?.map((link, i) => {
					return (
						<div
							key={i}
							className={`sm:mx-6 text-sm sm:text-[16px] duration-300 border border-[#094B10] text-[#094B10] px-5 sm:px-8 p-3 cursor-pointer ${
								activeLink === link
									? "bg-[#094B10] text-white"
									: "hover:text-[#fff] hover:bg-[#094B10]"
							}`}
							style={{ fontFamily: "Days One" }}
							onClick={() => {
								setActiveLink(link);
								scrollUp(650);
							}}>
							{link}
						</div>
					);
				})}
			</div>
			<FilterComponent />
		</div>
	);
};

export default CoursesMentorsWorkshopNav;
