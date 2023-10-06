/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { IMentor } from "../../../../interfaces";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import {
	AvailabiltySchedule,
	Experience,
	FeaturedReviews,
	Projects,
	Skills,
	Socials,
} from "../../../ui/organisms/mentor/details/";
import Carousel from "react-multi-carousel";
import DisplayCourseCard from "../../../ui/atom/cards/home/DisplayCourseCard";
import courses from "../../../../data/courses";
import { getMentorCourses } from "../../../../services/api";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import { AnimationOnScroll } from "react-animation-on-scroll";

const MentorDetailsTemplate = (mentor: IMentor) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

	const coursesByMentor = getMentorCourses(mentor.username);

	const moveLeft = () => {
		if (currentSlideIndex > 0) {
			setCurrentSlideIndex((prev) => prev - 1);
			carouselRef.current?.scrollBy({
				left: -250,
				behavior: "smooth",
			});
		}
	};

	const moveRight = () => {
		if (currentSlideIndex < coursesByMentor.length - 1) {
			setCurrentSlideIndex((prev) => prev + 1);
			carouselRef.current?.scrollBy({
				left: 250,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<div className="min-h-screen pt-20 h-full lg:px-20 sm:px-12 px-6">
				<div className=" animate__animated animate__slideInDown">
					<MentorProfileCard mentor={mentor} detailsPage />
				</div>
				<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
					<div className="flex-grow min-h-screen overflow-hidden">
						<AnimationOnScroll animateIn="animate__slideInUp">
							<Skills skills={mentor.skills} />
						</AnimationOnScroll>
						<Experience experience={mentor.experience} />
						<Projects projects={mentor.projects} />
						<FeaturedReviews />
						<div className="flex max-w-xl justify-between items-center mt-5">
							<p className="text-[#F15E63] cursor-pointer">! Report Mentor</p>
							<Socials />
						</div>
					</div>
					<AvailabiltySchedule />
				</div>
				<div className="mx-5 border-t border-[#A3A6A7] min-h-[50vh] mt-20 pb-20 pt-10">
					<h1 className="text-xl font-semibold">Courses by Mentor</h1>
					<div className="w-full relative my-5 ">
						{/* Control Buttons */}
						{coursesByMentor?.length >= 1 && (
							<>
								<svg
									onClick={moveLeft}
									width="45"
									height="45"
									viewBox="0 0 45 45"
									fill="none"
									className={`hidden sm:flex absolute top-[43%] -left-10 xl:-left-16 cursor-pointer z-20 ${
										currentSlideIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
									}`}
								>
									<path
										d="M22.5 2.8125C18.6062 2.8125 14.7998 3.96715 11.5622 6.13044C8.32463 8.29373 5.80123 11.3685 4.31113 14.9659C2.82103 18.5633 2.43115 22.5218 3.1908 26.3408C3.95045 30.1598 5.8255 33.6678 8.57884 36.4212C11.3322 39.1745 14.8402 41.0496 18.6592 41.8092C22.4782 42.5689 26.4367 42.179 30.0341 40.6889C33.6315 39.1988 36.7063 36.6754 38.8696 33.4378C41.0329 30.2002 42.1875 26.3938 42.1875 22.5C42.1875 17.2786 40.1133 12.271 36.4212 8.57884C32.729 4.88671 27.7215 2.8125 22.5 2.8125ZM33.75 23.9062H16.6641L24.5109 31.7433L22.5 33.75L11.25 22.5L22.5 11.25L24.5109 13.2089L16.6641 21.0938H33.75V23.9062Z"
										fill={currentSlideIndex >= 1 ? "#70C5A1" : "#70C5A15a"}
									/>
								</svg>
								<svg
									onClick={moveRight}
									width="45"
									height="45"
									viewBox="0 0 45 45"
									fill="none"
									className={`hidden sm:flex absolute top-[43%] right-0 xl:-right-16 rotate-[180deg] cursor-pointer z-20 ${
										currentSlideIndex === coursesByMentor.length - 1
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
								>
									<path
										d="M22.5 2.8125C18.6062 2.8125 14.7998 3.96715 11.5622 6.13044C8.32463 8.29373 5.80123 11.3685 4.31113 14.9659C2.82103 18.5633 2.43115 22.5218 3.1908 26.3408C3.95045 30.1598 5.8255 33.6678 8.57884 36.4212C11.3322 39.1745 14.8402 41.0496 18.6592 41.8092C22.4782 42.5689 26.4367 42.179 30.0341 40.6889C33.6315 39.1988 36.7063 36.6754 38.8696 33.4378C41.0329 30.2002 42.1875 26.3938 42.1875 22.5C42.1875 17.2786 40.1133 12.271 36.4212 8.57884C32.729 4.88671 27.7215 2.8125 22.5 2.8125ZM33.75 23.9062H16.6641L24.5109 31.7433L22.5 33.75L11.25 22.5L22.5 11.25L24.5109 13.2089L16.6641 21.0938H33.75V23.9062Z"
										fill={
											currentSlideIndex >= coursesByMentor?.length - 2
												? "#70C5A15a"
												: "#70C5A1"
										}
									/>
								</svg>
							</>
						)}
						{/*  */}
						<div className="flex justify-center overflow-hidden">
							<div
								ref={carouselRef}
								className="flex items-center gap-5 snap-x snap-mandatory overflow-x-auto min-w-[60rem] w-full py-5 px-2"
								style={{ scrollbarWidth: "none" }}
							>
								{coursesByMentor.map((item, index) => {
									return (
										<div className="snap-start lg:min-w-[35%] min-w-[40%]" key={index}>
											<DisplayCourseCard course={item} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<>
				<h1 className="text-center mt-10" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</>
		</>
	);
};

export default MentorDetailsTemplate;
