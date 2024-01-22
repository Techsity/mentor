import React from "react";
import MenteeDashboardHero from "../../../ui/organisms/user/dashboard/hero";
import CoursesMentorsWorkshop from "../../../ui/organisms/user/dashboard/courses-mentors-workshop";
import BecomeMentor from "../../../ui/organisms/home/become-a-mentor";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";

const DashboardTemplate = () => {
	return (
		<div className="relative">
			<MenteeDashboardHero />
			<CoursesMentorsWorkshop />
			<BecomeMentor />
			<>
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</>
		</div>
	);
};

export default DashboardTemplate;
