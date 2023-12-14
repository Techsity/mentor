import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { ICourse, IWorkshop } from "../../../../../interfaces";

const WhatToLearnInWorkshop = (workshop: IWorkshop) => {
	return (
		<div className="my-6">
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<div className="">
					<h1 className="font-semibold text-xl">What you’d Learn</h1>
					<p className="text-zinc-400 font-[300] max-w-2xl text-sm sm:text-[15px]">
						At the end of this workshop you would be able to understand:
					</p>
					<div className="grid lg:grid-cols-2 md:grid-cols-3 gap-5 my-6 max-w-2xl">
						{workshop.what_to_learn.map((learn, i) => (
							<span className="flex items-center gap-2 break-words sm:text-[15px] text-sm" key={i}>
								<svg width="11" height="10" viewBox="0 0 11 10" fill="none" className="">
									<path
										d="M3.61047 10L0 6.00386L1.64535 4.18275L3.61047 6.36422L9.35465 0L11 1.82111L3.61047 10Z"
										fill="#70C5A1"
									/>
								</svg>
								{learn}
							</span>
						))}
					</div>
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default WhatToLearnInWorkshop;
