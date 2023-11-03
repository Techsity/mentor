/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons";
import { MentorLogoLight } from "../../atom/icons/svgs";
import { useRouter } from "next/router";

const Footer = () => {
	const router = useRouter();
	const excludedPaths: string[] = ["purchase", "register", "profile"];
	const hideFooter: boolean = excludedPaths.some((path) =>
		router.asPath.includes(path),
	);

	return hideFooter ? null : (
		<footer className="bg-[#021A05] pt-5 z-20">
			<div className="mx-auto w-full max-w-screen-2xl">
				<div className="grid grid-cols-2 gap-8 px-4 py-8 lg:py-20 md:grid-cols-4 xl:grid-cols-5 md:px-20 xl:px-40">
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Company
						</h2>
						<ul
							className="text-white"
							style={{ fontWeight: "300" }}>
							<Link href="/about">
								<li className="mb-4 cursor-pointer text-[14px]">
									About Us
								</li>
							</Link>
							<div className="flex gap-4 items-center">
								<Link href="/help">
									<li className="mb-4 cursor-pointer text-[14px]">
										Help
									</li>
								</Link>
								<Link href="/blog">
									<li className="mb-4 cursor-pointer text-[14px]">
										Blog
									</li>
								</Link>
							</div>
							<Link href="/privacy">
								<li className="mb-4 cursor-pointer text-[14px]">
									Privacy Policy
								</li>
							</Link>
						</ul>
					</div>
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Products
						</h2>
						<ul
							className="text-white"
							style={{ fontWeight: "300" }}>
							<Link href="#">
								<li className="mb-4 cursor-pointer text-[14px]">
									Technical Courses
								</li>
							</Link>
							<Link href="#">
								<li className="mb-4 cursor-pointer text-[14px]">
									Vocational Courses
								</li>
							</Link>
							<Link href="#">
								<li className="mb-4 cursor-pointer text-[14px]">
									Educational Courses
								</li>
							</Link>
						</ul>
					</div>
					<div>
						<ul
							className="text-white mt-10"
							style={{ fontWeight: "300" }}>
							<Link href="#">
								<li className="mb-4 cursor-pointer text-[14px]">
									Live Mentorship Events
								</li>
							</Link>
							<Link href="#">
								<li className="mb-4 cursor-pointer text-[14px]">
									Find Mentors
								</li>
							</Link>
							<Link href={"/mentor/onboarding"}>
								<li className="mb-4 cursor-pointer text-[14px]">
									Become a Mentor
								</li>
							</Link>
						</ul>
					</div>
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Contact
						</h2>
						<ul
							className="text-white"
							style={{ fontWeight: "300" }}>
							<Link href="#">
								<li className="mb-3 cursor-pointer text-[14px]">
									mentor@tecsity.io
								</li>
							</Link>
							<SocialIcons />
							<Link href="/premium">
								<li className="mb-4 cursor-pointer text-[15px] font-medium">
									Mentor Premium
								</li>
							</Link>
						</ul>
					</div>
					<div className="flex justify-center items-center">
						<div className="grid" style={{ fontWeight: "300" }}>
							<MentorLogoLight />
							<span className="mb-4 text-white cursor-pointer text-[14px]">
								from Techsity
							</span>
							<span className="mb-4 text-white cursor-pointer text-[14px]">
								(c) Copyright mentör 2023 - All rights reserved
							</span>
						</div>
					</div>
				</div>
				{/* <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between md:px-20 xl:px-40">
					<span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
						© 2023 <span>Mentör™</span> | All Rights Reserved.
					</span>
				</div> */}
			</div>
		</footer>
	);
};

export default Footer;
