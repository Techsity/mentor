/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { LiveWorkshopGlobeSvg } from "../../../atom/icons";
import Link from "next/link";

const LiveWorkshops = () => {
	return (
		<div className="bg-[#021A05] relative tracking-tight overflow-hidden py-5 w-screen mb-20 text-white tracking-tight md:flex justify-center items-center lg:px-44 sm:px-16 px-6">
			<div className="flex justify-center h-full absolute w-full left-0 top-0">
				<img src="/assets/images/map2.png" className="" alt="" />
			</div>
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="max-w-lg lg:max-w-xl xl:max-w-2xl grid gap-5 md:py-0 py-10">
					<h1 className="text-2xl max-w-lg" style={{ fontFamily: "Days One" }}>
						Live Mentorship Workshop anytime, anywhere, at your convenience!
					</h1>
					<p className="text-sm">
						We understand how it&apos;s hard to create or join a mentorship event can
						be, so we have tried our best to self the issue for you.
					</p>
					<div className="flex justify-start">
						<Link href="#">
							<div
								style={{ fontFamily: "Days One" }}
								className="bg-[#FFB100] px-5 p-2 cursor-pointer text-black"
							>
								Join a live Event Now
							</div>
						</Link>
					</div>
				</div>
			</AnimationOnScroll>
			<div className="flex-grow pb-10 md:pb-0">
				<AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
					<div className="relative">
						<div className="absolute left-[23%]">
							<LiveWorkshopGlobeSvg />
						</div>
						<img
							src="/assets/svgs/live_workshop2.svg"
							alt=""
							className="z-10 relative"
						/>
					</div>
				</AnimationOnScroll>
			</div>
		</div>
	);
};

export default LiveWorkshops;
