/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons";
import { MentorLogoLight } from "../../atom/icons/svgs";
import { useRouter } from "next/router";
import { courseTypes } from "../../../../data/courses";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";

const Footer = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	const excludedPaths: string[] = ["purchase", "register", "profile", "admin", "success", "learn", "session"];
	const hideFooter: boolean = excludedPaths.some((path) => router.asPath.includes(path));

	return hideFooter ? (
		<></>
	) : (
		<footer className="bg-[#021A05] pt-5 z-20 max-w-[1200px]mx-auto">
			<div className="mx-auto w-full max-w-screen-2xl">
				<div className="grid grid-cols-2 gap-8 px-4 py-8 lg:py-20 md:grid-cols-4 xl:grid-cols-5 md:px-20 xl:px-40">
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Company
						</h2>
						<ul className="text-white" style={{ fontWeight: "300" }}>
							<Link prefetch={false} href="/about">
								<li className="mb-4 cursor-pointer text-[14px]">About Us</li>
							</Link>
							<div className="flex gap-4 items-center">
								<Link prefetch={false} href="/help">
									<li className="mb-4 cursor-pointer text-[14px]">Help</li>
								</Link>
								<Link prefetch={false} href="/blog">
									<li className="mb-4 cursor-pointer text-[14px]">Blog</li>
								</Link>
							</div>
							<Link prefetch={false} href="/privacy">
								<li className="mb-4 cursor-pointer text-[14px]">Privacy Policy</li>
							</Link>
						</ul>
					</div>
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Products
						</h2>
						<ul className="text-white" style={{ fontWeight: "300" }}>
							{courseTypes.map((ct, index) => {
								return (
									<li
										onClick={() => router.push(`/courses?type=${ct.name}`)}
										key={index}
										className="capitalize mb-4 cursor-pointer text-[14px]">
										{ct.name} Courses
									</li>
								);
							})}
						</ul>
					</div>
					<div>
						<ul className="text-white mt-10" style={{ fontWeight: "300" }}>
							{/* //Todo update links to go to all live workshops page */}
							<Link prefetch={false} href="/profile/workshop/live?id=dujhedjkgfju">
								<li className="mb-4 cursor-pointer text-[14px]">Live Mentorship Events</li>
							</Link>
							<Link prefetch={false} href="/mentors">
								<li className="mb-4 cursor-pointer text-[14px]">Find Mentors</li>
							</Link>
							<Link prefetch={false} href={!user?.is_mentor ? "/mentor/onboarding" : "#"}>
								<li className="mb-4 cursor-pointer text-[14px]">Become a Mentor</li>
							</Link>
						</ul>
					</div>
					<div>
						<h2
							className="mb-6 text-sm font-medium text-white uppercase"
							style={{ fontFamily: "Days One" }}>
							Contact
						</h2>
						<ul className="text-white" style={{ fontWeight: "300" }}>
							<Link prefetch={false} href="mailto:mentor@tecsity.io">
								<li className="mb-3 cursor-pointer text-[14px]">mentor@tecsity.io</li>
							</Link>
							<SocialIcons />
							<Link prefetch={false} href="/premium">
								<li className="mb-4 cursor-pointer text-[15px] font-medium">Mentor Premium</li>
							</Link>
						</ul>
					</div>
					<div className="flex xl:justify-center xl:items-center">
						<div className="grid" style={{ fontWeight: "300" }}>
							<div className="" onClick={() => router.push("/")}>
								<MentorLogoLight />
							</div>
							<span className="mb-4 text-white cursor-pointer text-[14px]">from Techsity</span>
							<span className="mb-4 text-white cursor-pointer text-[14px]">
								(c) Copyright Mentör™ {new Date().getFullYear()}
								<br />
								All rights reserved
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
