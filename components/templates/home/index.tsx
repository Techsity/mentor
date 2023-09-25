/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CheckmarkSharp } from "react-ionicons";
import { HomepageHeroSvg } from "../../ui/atom/icons";
import Link from "next/link";
import HomepageHero from "../../ui/organisms/home/hero";
import HomepageTestimonialSection from "../../ui/organisms/home/testimonials";

const HomepageTemplate = () => {
	return (
		<>
			<HomepageHero />
			<HomepageTestimonialSection />
		</>
	);
};

export default HomepageTemplate;
