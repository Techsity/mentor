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
import BecomeMentor from "../../ui/organisms/home/become-a-mentor";
import NewsLetterForm from "../../ui/atom/forms/NewsLetterForm";

const HomepageTemplate = () => {
	return (
		<>
			<HomepageHero />
			<HomepageTestimonialSection className="pt-52 lg:pt-80" />
			<Companies />
			<HomepageCourseSection />
			<LiveWorkshops />
			<InstantHelp />
			<Services />
			<MeetOurMentors />
			<BecomeMentor />
			<>
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</>
		</>
	);
};

export default HomepageTemplate;
