import React, { useMemo } from "react";
import { TabLinkType } from "../../../../templates/user/profile";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../data/courses";
import RegisteredMentorships from "./RegisteredMentorships";
import RegitsteredWorkshops from "./RegitsteredWorkshops";
import WishLists from "./WishLists";

const ProfileComponents = ({ activeTab }: { activeTab: TabLinkType }) => {
	const myCourses = useMemo(
		() => courses[0].categories[0].availableCourses,
		[activeTab],
	);
	return (
		<>
			<h1 className="font-medium text-xl mb-5 animate__animated animate__fadeInDown">
				{activeTab}
			</h1>
			{activeTab === "My Courses" ? (
				<>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						{myCourses.map((course, i) => (
							<CourseInProgressDisplayCard {...course} key={i} />
						))}
					</div>
				</>
			) : activeTab === "My Workshop" ? (
				<>
					<RegitsteredWorkshops />
				</>
			) : activeTab === "Mentorship" ? (
				<>
					<RegisteredMentorships />
				</>
			) : activeTab === "Wish Lists" ? (
				<>
					<WishLists />
				</>
			) : activeTab === "Payment Methods" ? (
				<>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						Coming Soon
					</div>
				</>
			) : activeTab === "Profile Settings" ? (
				<>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						Coming Soon
					</div>
				</>
			) : (
				<>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						{myCourses.map((course, i) => (
							<CourseInProgressDisplayCard {...course} key={i} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default ProfileComponents;
