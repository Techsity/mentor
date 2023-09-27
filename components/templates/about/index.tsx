import React from "react";
import AboutPageHero from "../../ui/organisms/about/hero";
import Connect from "../../ui/organisms/about/connect";
import WhyMentor from "../../ui/organisms/about/why";
import HowToAttendWorkshop from "../../ui/organisms/about/workshop";

const AboutPageTemplate = () => {
	return (
		<>
			<AboutPageHero />
			<Connect />
			<WhyMentor />
			<HowToAttendWorkshop />
		</>
	);
};

export default AboutPageTemplate;
