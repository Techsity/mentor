import React, { useState } from "react";
import LandingSearchBar from "../../atom/forms/LandingSearchBar";
import { MentorLogoDark } from "../../atom/icons/svgs";
import Link from "next/link";
import { useRouter } from "next/router";
import navLinks from "../../../../data/navlinks";
import { MenuSharp } from "react-ionicons";
import { useSidebar } from "../../../../context/sidebar.context";
import NavLinksComponent from "./NavLinksComponent";

const Navbar = () => {
	const router = useRouter();
	const { toggleSidebar } = useSidebar();

	const excludedPaths: string[] = ["auth", "dashboard", "onboarding"];

	const hideNavSections: boolean = excludedPaths.some((path) =>
		router.asPath.includes(path),
	);

	return (
		<nav className="sticky h-20 top-0 w-full z-40 items-center bg-white shadow flex 2xl:gap-6 justify-between p-4 sm:px-12 tracking-tight oveflow-hidden animate__animated animate__fadeIn">
			<Link href="/">
				<div>
					<MentorLogoDark className="cursor-pointer" />
				</div>
			</Link>
			{!hideNavSections ? (
				<div className="ml-6 xl:grid hidden flex-grow relative max-w-lg">
					<LandingSearchBar />
				</div>
			) : null}
			{!hideNavSections ? <NavLinksComponent /> : null}
			<div className="flex items-center gap-6 select-none">
				<div className="hidden sm:flex items-center gap-6 pl-10 2xl:pl-40">
					<Link href="/auth?login">
						<span className="hover:text-[#FFB100] text-sm text-[#094B10] cursor-pointer duration-300">
							Login
						</span>
					</Link>
					<Link href="/auth?signup">
						<span className="bg-[#FFB100] text-sm select-none duration-300 hover:bg-[#C68900] p-2 px-5 text-[#094B10] cursor-pointer rounded-lg">
							Signup
						</span>
					</Link>
				</div>
				<div className="md:hidden">
					<MenuSharp
						onClick={toggleSidebar}
						width="30px"
						height="30px"
						cssClasses="cursor-pointer"
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
