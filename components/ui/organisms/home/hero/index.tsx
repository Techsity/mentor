/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CheckmarkSharp } from "react-ionicons";
import { HomepageHeroSvg } from "../../../atom/icons/svgs";
import Link from "next/link";

const HomepageHero = () => {
	const features = [
		"Join millions of students benefiting from our free courses and events.",
		"Explore our extensive collection of over 5 million courses.",
		"Enjoy free live workshop tailored to your interest. Interact with mentors and mentees.",
		"Access over 100,000 mentors eager to connect with you through a call.",
	];
	return (
		<div
			className="h-screen w-screen text-white relative z-10"
			style={{
				background: `url("/assets/images/landing_hero.png")`,
				backgroundSize: "100% 100%",
				backgroundRepeat: "no-repeat",
			}}>
			<div
				className={`-top-10 -left-40 bg-[#00FF7E] opacity-10 rounded-full absolute w-[350px] h-[350px]`}
				style={{ filter: "blur(100px)" }}
			/>
			<div
				className={`-top-10 -left-40 bg-[#00FF7E] opacity-10 rounded-full absolute w-[400px] h-[400px] animate-[ping_linear_6s_infinite]`}
				style={{ filter: "blur(80px)" }}
			/>
			<div className="absolute -left-20 h-auto md:w-[65%]  animate__slideInDown animate__slow">
				<img src="/assets/images/map.png" className="h-full w-full" alt="" />
			</div>
			<div className="lg:flex justify-between items-center xl:items-start lg:pt-[10vh] lg:px-24 md:px-16 px-6">
				<div className="lg:py-20 py-6">
					<h1 className="text-2xl lg:text-3xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
						Connect with
					</h1>
					<h1 className="lg:text-[65px] text-4xl md:text-6xl" style={{ fontFamily: "Days One" }}>
						ment<span className="text-[#FFB100]">örs</span>
					</h1>
					<p>from anywhere around the globe!</p>
					<div className="grid mt-6 text-xs sm:text-sm gap-4 text-[#ddd]">
						{features.map((item, i) => {
							return (
								<div key={i} className="flex gap-1 items-center">
									<CheckmarkSharp color="#0CF27E" width="15px" height="15px" />
									<p>{item}</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="">
					<div className="xl:grid hidden">
						<HomepageHeroSvg />
					</div>
					<div className="flex lg:justify-center items-center whitespace-nowrap">
						<div className="grid gap-1 sm:mt-10">
							<p className="text-sm">Monetize your events and courses today.</p>
							<Link href="/premium">
								<div className="text-center bg-[#FFB100] select-none p-2 px-4 cursor-pointer">
									Become a Premium Member
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomepageHero;
