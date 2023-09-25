import React from "react";
import HomepageTestimonialSectionCard from "./HomepageTestimonialSectionCard";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Link from "next/link";

const HomepageTestimonialSection = () => {
	return (
		<div className="md:flex justify-between items-start min-h-[50dvh] gap-6 lg:my-20 px-10 lg:px-16 xl:px-36 bg-[#E9E8E7] relative -top-60 pt-52 py-16">
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="md:hidden grid gap-6 py-10 flex-grow order-1">
					<p
						className="text-[#33AC15] max-w-sm  text-2xl"
						style={{ fontFamily: "Days One" }}
					>
						Over +500k Students Gave us their Thumbs Up
					</p>
					<p className="text-sm max-w-sm">
						In case you&apos;re in any doubt, check out the reviews of over 500k
						students about how we&apos;ve help and turn their life around
					</p>
				</div>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="grid md:grid-cols-2 lg:gap-5 gap-3">
					<HomepageTestimonialSectionCard />
					<HomepageTestimonialSectionCard />
				</div>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
				<div className="hidden md:grid gap-6 py-10 flex-grow order-1">
					<p
						className="text-[#33AC15] max-w-sm  text-2xl"
						style={{ fontFamily: "Days One" }}
					>
						Over +500k Students Gave us their Thumbs Up
					</p>
					<p className="text-sm max-w-sm">
						In case you&apos;re in any doubt, check out the reviews of over 500k
						students about how we&apos;ve help and turn their life around
					</p>
					<div className="flex justify-start">
						<Link href="#">
							<div className="bg-[#094B10] text-white p-2 cursor-pointer px-5">
								Check all Reviews
							</div>
						</Link>
					</div>
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default HomepageTestimonialSection;
