import React from "react";
import useWindowSize from "../../../../../hooks/useWindowSize";
import { AnimationOnScroll } from "react-animation-on-scroll";
import mentors from "../../../../../data/mentors";
import MentorDisplayCard from "../../../atom/cards/home/MentorDisplayCard";

const MeetOurMentors = () => {
	const { isLargeScreen, isMediumScreen, isExtraLargeScreen } = useWindowSize();
	return (
		<div className="bg-[#F6FFFB] min-h-[50dvh] p-20 overflow-hidden">
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<h1
					style={{ fontFamily: "Days One" }}
					className="text-xl md:text-3xl text-center text-[#0C202B]"
				>
					Meet our Mentors
				</h1>
				<div className="flex justify-center mt-6">
					<div className="py-6 flex sm:flex-row gap-5 flex-col items-center">
						{mentors
							.map((mentor, index) => (
								<MentorDisplayCard mentor={mentor} key={index} />
							))
							.slice(0, isExtraLargeScreen ? 5 : isLargeScreen ? 4 : 3)}
					</div>
				</div>
				<div className="flex justify-center"></div>
			</AnimationOnScroll>
		</div>
	);
};

export default MeetOurMentors;
