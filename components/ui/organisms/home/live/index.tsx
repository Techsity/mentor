import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

const LiveWorkshops = () => {
	return (
		<div className="">
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={!true}>
				<div>021A05</div>
				LiveWorkshops
			</AnimationOnScroll>
		</div>
	);
};

export default LiveWorkshops;
