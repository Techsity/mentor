import React from "react";
import NewsLetterForm from "../../ui/atom/forms/NewsLetterForm";
import HelpPageHero from "../../ui/organisms/help/hero";
import HelpFAQS from "../../ui/organisms/help/faqs";

const HelpPageTemplate = () => {
	return (
		<>
			<HelpPageHero />
			<HelpFAQS />
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

export default HelpPageTemplate;
