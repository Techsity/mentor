import React from "react";
import AboutPageHero from "../../ui/organisms/about/hero";
import Connect from "../../ui/organisms/about/connect";
import WhyMentor from "../../ui/organisms/about/why";
import HowToAttendWorkshop from "../../ui/organisms/about/how-to-attend-workshop";
import HowMentorsCanHelpYou from "../../ui/organisms/about/how";
import AboutBlogSection from "../../ui/organisms/about/blog";
import NewsLetterForm from "../../ui/atom/forms/NewsLetterForm";
import HomepageTestimonialSection from "../../ui/organisms/home/testimonials";
import { AnimationOnScroll } from "react-animation-on-scroll";

const AboutPageTemplate = () => {
	return (
		<>
			<AboutPageHero />
			<Connect />
			<WhyMentor />
			<HowToAttendWorkshop />
			<AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
				<HowMentorsCanHelpYou />
			</AnimationOnScroll>
			<AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
				<AboutBlogSection />
			</AnimationOnScroll>
			<HomepageTestimonialSection className="mt-10" />
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

export default AboutPageTemplate;
