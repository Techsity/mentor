import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import MentorDisplayCard from "../../../atom/cards/home/MentorDisplayCard";
import { useQuery } from "@apollo/client";
import { HOMEPAGE_MENTORS_LIST } from "../../../../../services/graphql/queries/mentor";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import { useRouter } from "next/router";

const MeetOurMentors = () => {
	const { data, error, loading } = useQuery<{ viewAllMentors: IMentor[] }>(HOMEPAGE_MENTORS_LIST);
	const mentors = data?.viewAllMentors;
	const router = useRouter();

	if (!loading && error) {
		console.error(JSON.stringify(error));
	}

	return (
		<div className="bg-[#F6FFFB] min-h-[40dvh] p-20 overflow-hidden">
			<AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
				<h1 style={{ fontFamily: "Days One" }} className="text-xl md:text-3xl text-center text-[#0C202B]">
					Meet our Mentors
				</h1>
				{error ? (
					<div className="text-red-500">Something went wrong while loading mentors</div>
				) : (
					<>
						<div className="flex justify-center mt-6 min-h-[50dvh]">
							{/* <div className="py-6 flex sm:flex-row gap-5 flex-col items-center"> */}
							{mentors && mentors.length >= 1 && (
								<div className="max-w-[90dvw] mx-auto relative">
									<div className="flex overflow-x-scroll pb-10 hide-scroll-bar gap-2 relative mx-auto">
										{mentors
											.map((mentor, index) => <MentorDisplayCard mentor={mentor} key={index} />)
											.slice(0, 6)}
									</div>
								</div>
							)}
						</div>
						<div className="flex justify-center mt-3">
							<div
								onClick={() => router.push("/mentors")}
								className="px-16 hover:bg-[#083C0E] whitespace-nowrap select-none duration-300 bg-[#094B10] p-3 text-white rounded cursor-pointer"
								style={{ fontFamily: "Days One" }}>
								Explore all Mentörs
							</div>
						</div>
					</>
				)}
			</AnimationOnScroll>
		</div>
	);
};

export default MeetOurMentors;
