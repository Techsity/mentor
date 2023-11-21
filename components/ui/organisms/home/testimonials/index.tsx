import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Link from "next/link";
import HomepageTestimonialSectionCard from "../../../atom/cards/home/HomepageTestimonialSectionCard";

const HomepageTestimonialSection = ({ className }: { className?: string }) => {
	return (
		<div
			className={`lg:flex justify-between items-start gap-6 px-5 sm:px-10 lg:px-12 xl:px-24 bg-[#E9E8E7] -mt-60 py-16 ${className}`}>
			<div className="lg:hidden grid gap-6 py-10 flex-grow">
				<p
					className="text-[#33AC15] max-w-md  text-2xl"
					style={{ fontFamily: "Days One" }}>
					Over +500k Students Gave us their Thumbs Up
				</p>
				<p className="text-sm max-w-md">
					In case you&apos;re in any doubt, check out the reviews of
					over 500k students about how we&apos;ve help and turn their
					life around
				</p>
			</div>

			<AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
				<div className="grid sm:grid-cols-2 lg:gap-5 gap-3">
					<HomepageTestimonialSectionCard fullName="Adewole Sulaiman" />
					<HomepageTestimonialSectionCard fullName="Adewole Sulaiman" />
				</div>
			</AnimationOnScroll>
			<AnimationOnScroll
				animateIn="animate__fadeInRight"
				animateOnce={true}>
				<div className="hidden lg:grid gap-6 py-10 flex-grow order-1">
					<p
						className="text-[#33AC15] max-w-md  text-2xl"
						style={{ fontFamily: "Days One" }}>
						Over +500k Students Gave us their Thumbs Up
					</p>
					<p className="text-sm max-w-md">
						In case you&apos;re in any doubt, check out the reviews
						of over 500k students about how we&apos;ve help and turn
						their life around
					</p>
					<div className="flex justify-start">
						<Link href="#">
							<div className="bg-[#094B10] select-none text-white p-2 cursor-pointer px-5">
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
