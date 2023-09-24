import React from "react";
import LandingSearchBar from "../../atom/forms/LandingSearchBar";
import { MentorLogo } from "../../atom/icons";
import Link from "next/link";

const Navbar = () => {
	const navLinks: { name: string; link: string }[] = [
		{
			link: "#",
			name: "Courses",
		},
		{
			link: "#",
			name: "Live Workshop",
		},
		{
			link: "#",
			name: "Mentors",
		},
	];
	return (
		<nav className="items-center flex justify-between gap-12 justify-between p-6 px-12 tracking-tight">
			<div className="">
				<MentorLogo />
			</div>
			<div className="ml-12 xl:grid hidden flex-grow relative">
				<LandingSearchBar />
			</div>
			<div className="flex justify-between gap-6 items-center text-[#094B10]">
				<ul className="flex items-center gap-6">
					{navLinks.map(({ link, name }, index) => (
						<Link href={link} key={index}>
							<li className="cursor-pointer relative group px-2">
								<span className="duration-500 group-hover:text-white relative z-10">
									{name}
								</span>
								<span className="absolute h-[2px] w-0 group-hover:w-full group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300"></span>
								<span className="absolute h-full w-0 group-hover:w-full left-0 bottom-0 bg-[#094B10] duration-300"></span>
							</li>
						</Link>
					))}
				</ul>
				<Link href={"#"}>
					<div className="border-[#094B10] select-none cursor-pointer font-semibold border-l-[.15em] border-r-[.15em] p-4 border-opacity-65 hover:text-white hover:bg-[#094B10] hover:rounded duration-300 h-5 flex items-center justify-center">
						Become a Mentor
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
