import React from "react";
import useWindowSize from "../../../../../hooks/useWindowSize";
import { AnimationOnScroll } from "react-animation-on-scroll";
import mentors from "../../../../../data/mentors";
import MentorDisplayCard from "../../../atom/cards/home/MentorDisplayCard";
import Link from "next/link";

const MeetOurMentors = () => {
	const { isLargeScreen, isMediumScreen, isExtraLargeScreen } =
		useWindowSize();
	return (
		<div className="bg-[#F6FFFB] min-h-[50dvh] p-20 overflow-hidden">
			<AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
				<h1
					style={{ fontFamily: "Days One" }}
					className="text-xl md:text-3xl text-center text-[#0C202B]">
					Meet our Mentors
				</h1>
				<div className="flex justify-center mt-6">
					{/* <div className="py-6 flex sm:flex-row gap-5 flex-col items-center"> */}
					<div className="max-w-[90dvw] mx-auto relative min-h-[50dvh]">
						<div className="flex overflow-x-scroll pb-10 hide-scroll-bar gap-2 relative mx-auto">
							{mentors
								.map((mentor, index) => (
									<MentorDisplayCard
										mentor={mentor}
										key={index}
									/>
								))
								.slice(0, 5)}
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-3">
					<Link href="#">
						<div
							className="px-16 hover:bg-[#083C0E] whitespace-nowrap select-none duration-300 bg-[#094B10] p-3 text-white rounded cursor-pointer"
							style={{ fontFamily: "Days One" }}>
							Explore all Mentörs
						</div>
					</Link>
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default MeetOurMentors;
