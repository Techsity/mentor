import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { IWorkshop } from "../../../../../interfaces";

const AboutWorkshop = (workshop: IWorkshop) => {
	return (
		<div className="animate__animated animate__fadeInUp">
			<h1 className="font-semibold text-xl">About this Workshop</h1>
			<p className="text-zinc-400 font-[300] max-w-2xl py-4 text-[14px] sm:text-[15px]">{workshop.description}</p>
		</div>
	);
};

export default AboutWorkshop;
