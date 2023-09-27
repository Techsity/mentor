import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import useWindowSize from "../../../../../hooks/useWindowSize";
import BlogSectionCard from "../../../atom/cards/about/BlogSectionCard";
import { IBlogPost } from "../../../../../interfaces";
import Link from "next/link";
import blogs from "../../../../../data/about/blogs";

const AboutBlogSection = () => {
	const carouselRef = useRef<Carousel>(null);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

	const moveLeft = () => {
		if (carouselRef.current) {
			setCurrentSlideIndex(carouselRef.current.state.currentSlide);
			carouselRef.current.previous(0);
		}
	};
	const moveRight = () => {
		if (carouselRef.current) {
			setCurrentSlideIndex(carouselRef.current.state.currentSlide);
			carouselRef.current.next(0);
		}
	};

	return (
		<div className="min-h-[50vh] items-center grid xl:grid-cols-12 h-full px-6 sm:pl-12 lg:pl-24 lg:my-16">
			<div className="md:col-span-5">
				<div>
					<h1
						style={{ fontFamily: "Days One" }}
						className="text-2xl sm:text-3xl max-w-md md:max-w-lg text-[#33AC15]"
					>
						We&apos;ve Got one or two to say, check our our Blög section.
					</h1>
					<div className="flex justify-start mt-10">
						<Link href="/blog">
							<div className="bg-[#094B10] cursor-pointer px-6 p-2 text-white select-none">
								Go to Blog Section
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="md:col-span-6 w-full md:block hidden relative my-5">
				{/* Control Buttons */}
				<svg
					onClick={moveLeft}
					width="45"
					height="45"
					viewBox="0 0 45 45"
					fill="none"
					className="absolute top-[43%] -left-10 xl:-left-16 cursor-pointer"
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
					className="absolute top-[43%] right-0 xl:-right-16 rotate-[180deg] cursor-pointer"
				>
					<path
						d="M22.5 2.8125C18.6062 2.8125 14.7998 3.96715 11.5622 6.13044C8.32463 8.29373 5.80123 11.3685 4.31113 14.9659C2.82103 18.5633 2.43115 22.5218 3.1908 26.3408C3.95045 30.1598 5.8255 33.6678 8.57884 36.4212C11.3322 39.1745 14.8402 41.0496 18.6592 41.8092C22.4782 42.5689 26.4367 42.179 30.0341 40.6889C33.6315 39.1988 36.7063 36.6754 38.8696 33.4378C41.0329 30.2002 42.1875 26.3938 42.1875 22.5C42.1875 17.2786 40.1133 12.271 36.4212 8.57884C32.729 4.88671 27.7215 2.8125 22.5 2.8125ZM33.75 23.9062H16.6641L24.5109 31.7433L22.5 33.75L11.25 22.5L22.5 11.25L24.5109 13.2089L16.6641 21.0938H33.75V23.9062Z"
						fill={currentSlideIndex >= blogs.length - 2 ? "#70C5A15a" : "#70C5A1"}
					/>
				</svg>

				{/*  */}
				<Carousel
					ref={carouselRef}
					{...slideOptions}
					autoPlay={false}
					infinite={false}
				>
					{blogs.map((item, index) => {
						return <BlogSectionCard {...item} key={index} />;
					})}
				</Carousel>
			</div>
		</div>
	);
};

const slideOptions = {
	ssr: true,
	additionalTransfrom: 0,
	arrows: false,
	autoPlaySpeed: 6000,
	centerMode: false,
	className: "ml-6",
	containerClass: "container ml-6",
	dotListClass: "",
	draggable: true,
	focusOnSelect: false,
	itemClass: "",
	keyBoardControl: true,
	minimumTouchDrag: 80,
	pauseOnHover: true,
	renderArrowsWhenDisabled: false,
	renderButtonGroupOutside: false,
	renderDotsOutside: false,
	responsive: {
		desktop: {
			breakpoint: {
				max: 3000,
				min: 1024,
			},
			items: 2,
			partialVisibilityGutter: 40,
		},
		mobile: {
			breakpoint: {
				max: 464,
				min: 0,
			},
			items: 1,
			partialVisibilityGutter: 30,
		},
		tablet: {
			breakpoint: {
				max: 1024,
				min: 464,
			},
			items: 2,
			partialVisibilityGutter: 30,
		},
	},
	rewind: false,
	rewindWithAnimation: false,
	rtl: false,
	shouldResetAutoplay: true,
	showDots: false,
	sliderClass: "",
	slidesToSlide: 1,
	swipeable: true,
	autoPlay: true,
};

export default AboutBlogSection;
