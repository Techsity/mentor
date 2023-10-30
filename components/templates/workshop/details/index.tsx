import React from "react";
import WorkShopDetailsBody from "../../../ui/organisms/workshop/body";
import WorkshopDetailsPageHero from "../../../ui/organisms/workshop/hero";
import workshops from "../../../../data/workshops";
import CoursePageAboutMentor from "../../../ui/organisms/course-details/about-mentor";
import OtherCoursesByMentor from "../../../ui/organisms/course-details/other-courses-by-mentor";
import { ChevronUpOutline } from "react-ionicons";
import { scrollToTop } from "../../../../utils";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";

const WorkShopDetailsPageTemplate = () => {
	const workshop = workshops[0];

	return (
		<>
			<div className="">
				<WorkshopDetailsPageHero {...workshop} />
				<WorkShopDetailsBody {...workshop} />
			</div>
			<CoursePageAboutMentor {...workshop.mentor} />
			<OtherCoursesByMentor mentor={workshop.mentor} />
			<div className="mt-28">
				<h1
					className="text-center mt-20"
					style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm
						handleSubmit={(email) => console.log(email)}
					/>
				</div>
			</div>
			{/* <div className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50 md:flex hidden"> */}
			<div
				className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50"
				onClick={scrollToTop}>
				<ChevronUpOutline color="green" height="30px" width="30px" />
			</div>
		</>
	);
};

export default WorkShopDetailsPageTemplate;
