/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CheckmarkSharp } from "react-ionicons";
import { HomepageHeroSvg } from "../../ui/atom/icons/svgs";
import Link from "next/link";
import HomepageHero from "../../ui/organisms/home/hero";
import HomepageTestimonialSection from "../../ui/organisms/home/testimonials";
import Companies from "../../ui/organisms/home/companies";
import HomepageCourseSection from "../../ui/organisms/home/courses";
import LiveWorkshops from "../../ui/organisms/home/live";
import InstantHelp from "../../ui/organisms/home/instant";
import Services from "../../ui/organisms/home/services";
import MeetOurMentors from "../../ui/organisms/home/mentors";

const HomepageTemplate = () => {
	return (
		<>
			<HomepageHero />
			<HomepageTestimonialSection />
			<Companies />
			<HomepageCourseSection />
			<LiveWorkshops />
			<InstantHelp />
			<Services />
			<MeetOurMentors />
		</>
	);
};

export default HomepageTemplate;
