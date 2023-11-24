import React, { Dispatch, SetStateAction, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import navLinks from "../../../../../data/navlinks";

const CourseNav = ({
	links,
	activeLink,
	setActiveLink,
}: {
	activeLink: string;
	links: string[];
	setActiveLink: (link: string) => void;
}) => {
	return (
		<div>
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="flex tracking-tight justify-center items-center mt-20 select-none">
					{links?.map((link, i) => {
						return (
							<div
								key={i}
								className={`sm:mx-12 mx-1 text-sm sm:text-sm duration-300 border border-[#094B10] text-[#094B10] px-4 sm:px-8 p-3 cursor-pointer ${
									activeLink === link
										? "bg-[#094B10] text-white"
										: "hover:text-[#fff] hover:bg-[#094B10]"
								}`}
								style={{ fontFamily: "Days One" }}
								onClick={() => setActiveLink(link)}
							>
								{link}
							</div>
						);
					})}
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default CourseNav;
