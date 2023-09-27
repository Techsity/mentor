import React from "react";
import Carousel from "react-multi-carousel";

const SlideControlButtons = ({
	moveLeft,
	moveRight,
	slides,
	slideRef,
}: {
	moveLeft: any;
	moveRight: any;
	slides?: number;
	currentSlideIndex?: number;
	slideRef?: React.RefObject<Carousel> | React.RefObject<any>;
}) => {
	return (
		<>
			<div className="absolute top-[48%] xl:left-16 md:block hidden left-10 z-10">
				<svg
					onClick={moveLeft}
					width="41"
					height="41"
					className="cursor-pointer"
					viewBox="0 0 41 41"
					fill="none"
				>
					<path
						d="M20.5 0.8125C16.6062 0.8125 12.7998 1.96715 9.56222 4.13044C6.32463 6.29373 3.80123 9.3685 2.31113 12.9659C0.82103 16.5633 0.431152 20.5218 1.1908 24.3408C1.95045 28.1598 3.8255 31.6678 6.57884 34.4212C9.33219 37.1745 12.8402 39.0496 16.6592 39.8092C20.4782 40.5689 24.4367 40.179 28.0341 38.6889C31.6315 37.1988 34.7063 34.6754 36.8696 31.4378C39.0329 28.2002 40.1875 24.3938 40.1875 20.5C40.1875 15.2786 38.1133 10.271 34.4212 6.57884C30.729 2.88671 25.7215 0.8125 20.5 0.8125ZM31.75 21.9062H14.6641L22.5109 29.7433L20.5 31.75L9.25001 20.5L20.5 9.25L22.5109 11.2089L14.6641 19.0938H31.75V21.9062Z"
						fill="black"
					/>
				</svg>
			</div>
			<div className="absolute top-[48%] xl:right-16 md:block hidden right-10 z-10">
				<svg
					onClick={moveRight}
					width="41"
					height="41"
					className="cursor-pointer"
					viewBox="0 0 41 41"
					fill="none"
				>
					<path
						d="M20.5 0.8125C24.3938 0.8125 28.2002 1.96715 31.4378 4.13044C34.6754 6.29373 37.1988 9.3685 38.6889 12.9659C40.179 16.5633 40.5688 20.5218 39.8092 24.3408C39.0496 28.1598 37.1745 31.6678 34.4212 34.4212C31.6678 37.1745 28.1598 39.0496 24.3408 39.8092C20.5218 40.5689 16.5633 40.179 12.9659 38.6889C9.36849 37.1988 6.29372 34.6754 4.13043 31.4378C1.96714 28.2002 0.812492 24.3938 0.812492 20.5C0.812492 15.2786 2.88671 10.271 6.57883 6.57884C10.271 2.88671 15.2785 0.8125 20.5 0.8125ZM9.24999 21.9062H26.3359L18.4891 29.7433L20.5 31.75L31.75 20.5L20.5 9.25L18.4891 11.2089L26.3359 19.0938H9.24999V21.9062Z"
						fill="black"
					/>
				</svg>
			</div>
		</>
	);
};

export default SlideControlButtons;
