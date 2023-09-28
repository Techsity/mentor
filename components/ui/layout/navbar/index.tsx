import React, { useState } from "react";
import LandingSearchBar from "../../atom/forms/LandingSearchBar";
import { MentorLogoDark } from "../../atom/icons/svgs";
import Link from "next/link";
import { useRouter } from "next/router";
import navLinks from "../../../../data/navlinks";
import { MenuSharp } from "react-ionicons";

const Navbar = () => {
	const router = useRouter();
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
	const [activeSublink, setActiveSublink] = useState<number | null>(null);

	const excludedPaths: string[] = ["auth", "dashboard"];
	const hideNavSections: boolean = excludedPaths.some((path) =>
		router.asPath.includes(path),
	);

	return (
		<nav className="fixed w-full z-20 items-center bg-white shadow flex justify-between 2xl:gap-6 justify-between p-6 sm:px-12 tracking-tight oveflow-hidden">
			<Link href="/">
				<div>
					<MentorLogoDark className="cursor-pointer" />
				</div>
			</Link>
			{!hideNavSections ? (
				<div className="ml-6 xl:grid hidden flex-grow relative">
					<LandingSearchBar />
				</div>
			) : null}
			{!hideNavSections ? (
				<div className="hidden md:flex justify-between gap-6 items-center text-[#094B10]">
					<ul className="hidden lg:flex items-center gap-6 whitespace-nowrap ml-4">
						{navLinks.map(({ link, name, sublinks }, index) => {
							return sublinks ? (
								<li
									key={index}
									className="relative px-2 font-[300] select-none"
									onMouseEnter={() => setActiveSublink(index)}
									onMouseLeave={() => {
										setActiveSublink(null);
										setActiveDropdown(null);
									}}
								>
									<span className={`duration-500 relative z-10 cursor-pointer`}>
										{name}
									</span>
									<span
										className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
											router.asPath.includes(link) ? "w-full" : "hover:w-full"
										}`}
									/>
									{activeSublink === index && sublinks && sublinks?.length > 0 ? (
										<div>
											<div className="h-[100px] group duration-300 absolute top-6 left-0 bg-white w-auto items-center gap-3 flex justify-between divide-x  animate__animate animate__fadeIn">
												{sublinks?.map((sublink, i) => (
													<div key={i}>
														<div
															className="mx-16 text-[#70C5A1] cursor-pointer flex flex-col justify-center items-center gap-2"
															onMouseEnter={() => setActiveDropdown(i)}
															// onMouseLeave={() => setActiveDropdown(null)}
														>
															{sublink.icon}
															{sublink.name}
														</div>
														{activeDropdown === i &&
															sublink.dropdown &&
															sublink.dropdown.length > 0 && (
																<div className="absolute w-full text-[#70C5A1] top-[100%] py-5 pb-10 left-0 bg-white hidden group-hover:grid grid-cols-3 gap-5 overflow-hidden animate__animate animate__fadeIn">
																	{sublink.dropdown.map(
																		(
																			{ link: dropdownLink, name: dropdownLinkName },
																			dropdownIndex,
																		) => (
																			<Link key={dropdownIndex} href={dropdownLink}>
																				<div
																					key={i}
																					onClick={() => {
																						setActiveSublink(null);
																						setActiveDropdown(null);
																					}}
																					className="px-6 relative text-sm cursor-pointer text-decoration hover:underline"
																				>
																					{dropdownLinkName}
																					<span className="absolute -right-4 bg-[#094B10] bg-opacity-20 h-[200%] w-[1px]"></span>
																				</div>
																			</Link>
																		),
																	)}
																</div>
															)}
													</div>
												))}
											</div>
										</div>
									) : null}
								</li>
							) : (
								<Link href={link} key={index}>
									<li className="relative px-2 font-[300] select-none">
										{/* <span
								className={`duration-500 ${
									router.asPath==link ? "text-white" : "group-hover:text-white"
								} relative z-10`}
							> */}
										<span className={`duration-500 relative z-10 cursor-pointer`}>
											{name}
										</span>
										<span
											className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
												router.asPath.includes(link) ? "w-full" : "hover:w-full"
											}`}
										/>
										{/* <span
								className={`absolute h-full w-0 right-0 bottom-0 bg-[#094B10] duration-300 ${
									router.asPath==link ? "w-full" : "group-hover:w-full"
								}`}
							/> */}
									</li>
								</Link>
							);
						})}
					</ul>
					<Link href={"#"}>
						<div className="whitespace-nowrap border-[#094B10] select-none cursor-pointer font-[500] border-l-[.15em] border-r-[.15em] p-4 border-opacity-65 hover:text-white hover:bg-[#094B10] hover:rounded duration-300 h-5 flex items-center justify-center">
							Become a Mentor
						</div>
					</Link>
				</div>
			) : null}
			<div className="flex items-center gap-6 select-none">
				<div className="hidden sm:flex items-center gap-6 pl-10 2xl:pl-40">
					<Link href="/auth?login">
						<span className="hover:text-[#FFB100] text-[#094B10] cursor-pointer duration-300">
							Login
						</span>
					</Link>
					<Link href="/auth?signup">
						<span className="bg-[#FFB100] select-none duration-300 hover:bg-[#C68900] p-2 px-5 text-[#094B10] cursor-pointer rounded-lg">
							Signup
						</span>
					</Link>
				</div>
				<div className="md:hidden">
					<MenuSharp width="30px" height="30px" cssClasses="cursor-pointer" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
