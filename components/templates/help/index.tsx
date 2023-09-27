import React from "react";
import NewsLetterForm from "../../ui/atom/forms/NewsLetterForm";
import HelpPageHero from "../../ui/organisms/help/hero";
import HelpFAQS from "../../ui/organisms/help/faqs";
import { ChevronUpOutline } from "react-ionicons";

const HelpPageTemplate = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			<HelpPageHero />
			<HelpFAQS />
			<div className="mt-28">
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</div>
			{/* <div className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50 md:flex hidden"> */}
			<div
				className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50"
				onClick={scrollToTop}
			>
				<ChevronUpOutline color="green" height="30px" width="30px" />
			</div>
		</>
	);
};

export default HelpPageTemplate;
