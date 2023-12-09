import React, { useState } from "react";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import BecomeMentor from "../../../ui/organisms/home/become-a-mentor";
import MenteeDashboardHero from "../../../ui/organisms/user/dashboard/hero";
import CoursesSection from "../../../ui/organisms/user/dashboard/courses-mentors-workshop/CoursesSection";

type CourseTypeSearchPageProps = {
	category?: string | null;
	courseType: string;
};

const AllCoursesPageTemplate = ({ courseType, category }: CourseTypeSearchPageProps) => {
	const [activeCategory, setActiveCategory] = useState<string>(category || "");
	return (
		<div className="relative">
			<MenteeDashboardHero categories={[]} loading={true} />
			<h1 className="my-4 text-center">All Courses</h1>
			<div className="my-10">
				<CoursesSection {...{ activeCategory }} />
			</div>
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

export default AllCoursesPageTemplate;
