import Link from "next/link";
import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import PremiumPageHero from "../components/ui/organisms/premuim/hero";
import PremiumPackages from "../components/ui/organisms/premuim/packages";
import { ChevronUpOutline } from "react-ionicons";
import NewsLetterForm from "../components/ui/atom/forms/NewsLetterForm";
import { scrollToTop } from "../utils";

const PremiumPage = () => {
	return (
		<>
			<PremiumPageHero />
			<PremiumPackages />
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<h1 className="text-center" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-16">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</AnimationOnScroll>
			<div
				className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50"
				onClick={scrollToTop}
			>
				<ChevronUpOutline color="green" height="30px" width="30px" />
			</div>
		</>
	);
};

export default PremiumPage;
