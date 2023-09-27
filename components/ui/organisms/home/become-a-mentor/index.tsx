/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { BecomeMentorSvg } from "../../../atom/icons/svgs";
import Link from "next/link";

const BecomeMentor = () => {
	return (
		<div className="bg-[#FFFAEF] relative mb-10 tracking-tight overflow-hidden py-2 sm:py-20 w-screen tracking-tight md:flex justify-center items-center lg:px-44 sm:px-16 px-6">
			<AnimationOnScroll animateIn="animate__slideInLeft" animateOnce={true}>
				<div className="max-w-lg lg:max-w-xl xl:max-w-2xl grid gap-5 md:py-0 py-10">
					<h1
						className="text-2xl md:text-3xl max-w-lg text-[#0C202B]"
						style={{ fontFamily: "Days One" }}
					>
						The Beauty of Knowledge is when it is passed down to the next generation!
					</h1>
					<p className="text-sm max-w-lg text-black" style={{ fontWeight: "300" }}>
						Are you highly skilled, or do you have a special knowledge in a very
						specific area of study? How would you like to make it available to
						millions of people? Then join our league of mentors and start getting paid
						while teaching what you love.
					</p>
					<div className="flex justify-start">
						<Link href="#">
							<div
								className="px-10 hover:bg-[#083C0E] duration-300 bg-[#094B10] p-3 text-white rounded cursor-pointer"
								style={{ fontFamily: "Days One" }}
							>
								Become a Mentör!
							</div>
						</Link>
					</div>
				</div>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
				<div className="pb-10 md:pb-0">
					<BecomeMentorSvg />
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default BecomeMentor;
