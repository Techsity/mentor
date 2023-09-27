import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import ConnectMentorSlideCard from "./ConnectMentorSlideCard";
import SlideControlButtons from "./SlideControlButtons";
import aboutHeroCarouselData from "../../../../../data/about/heroCarouselData";
import useWindowSize from "../../../../../hooks/useWindowSize";

const Connect = () => {
	const { isLargeScreen } = useWindowSize();
	const carouselRef = useRef<Carousel>(null);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(
		carouselRef.current ? carouselRef.current.state.currentSlide : 0,
	);

	const moveLeft = () => {
		if (carouselRef.current) carouselRef.current.previous(0);
	};
	const moveRight = () => {
		if (carouselRef.current) carouselRef.current.next(0);
	};

	return (
		<div className="py-20 relative w-full px-3 xl:px-40 md:px-20 animate__animated animate__slideInUp">
			<SlideControlButtons
				currentSlideIndex={currentSlideIndex}
				moveLeft={moveLeft}
				moveRight={moveRight}
			/>
			<Carousel ref={carouselRef} {...slideOptions} infinite={isLargeScreen}>
				{aboutHeroCarouselData.map((item, index) => {
					return <ConnectMentorSlideCard {...item} key={index} />;
				})}
			</Carousel>
		</div>
	);
};

const slideOptions = {
	ssr: true,
	additionalTransfrom: 0,
	arrows: false,
	autoPlaySpeed: 6000,
	centerMode: false,
	className: "",
	containerClass: "container",
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
			items: 1,
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
			items: 1,
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

export default Connect;
