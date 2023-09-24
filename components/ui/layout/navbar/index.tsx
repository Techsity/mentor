import React from "react";
import LandingSearchBar from "../../atom/forms/LandingSearchBar";
import { MentorLogo } from "../../atom/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();
	const navLinks: { name: string; link: string }[] = [
		{
			link: "#courses",
			name: "Courses",
		},
		{
			link: "#live-workshop",
			name: "Live Workshop",
		},
		{
			link: "#mentors",
			name: "Mentors",
		},
	];
	return (
		<nav className="fixed w-full z-20 items-center bg-white shadow flex justify-between gap-6 justify-between p-6 sm:px-12 tracking-tight oveflow-hidden">
			<Link href="#">
				<div>
					<MentorLogo className="cursor-pointer" />
				</div>
			</Link>
			<div className="ml-12 xl:grid hidden flex-grow relative">
				<LandingSearchBar />
			</div>
			<div className="hidden md:flex justify-between gap-6 items-center text-[#094B10]">
				<ul className="hidden lg:flex items-center gap-6">
					{navLinks.map(({ link, name }, index) => (
						<Link href={link} key={index}>
							<li className="cursor-pointer relative group px-2 font-[300]">
								<span
									className={`duration-500 ${
										router.asPath.includes(link) ? "text-white" : "group-hover:text-white"
									} relative z-10`}
								>
									{name}
								</span>
								<span
									className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
										router.asPath.includes(link) ? "w-full" : "group-hover:w-full"
									}`}
								/>
								<span
									className={`absolute h-full w-0 right-0 bottom-0 bg-[#094B10] duration-300 ${
										router.asPath.includes(link) ? "w-full" : "group-hover:w-full"
									}`}
								/>
							</li>
						</Link>
					))}
				</ul>
				<Link href={"#"}>
					<div className="border-[#094B10] select-none cursor-pointer font-[500] border-l-[.15em] border-r-[.15em] p-4 border-opacity-65 hover:text-white hover:bg-[#094B10] hover:rounded duration-300 h-5 flex items-center justify-center">
						Become a Mentor
					</div>
				</Link>
			</div>
			<div className="flex items-center gap-6 pl-10 2xl:pl-40">
				<Link href="#">
					<span className="hover:text-[#FFB100] text-[#094B10] cursor-pointer duration-300">
						Login
					</span>
				</Link>
				<Link href="#">
					<span className="bg-[#FFB100] duration-300 hover:bg-[#C68900] p-2 px-5 text-[#094B10] cursor-pointer rounded-lg">
						Signup
					</span>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
