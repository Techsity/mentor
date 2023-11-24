import React, { useMemo } from "react";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../data/courses";
import RegisteredMentorships from "./RegisteredMentorships";
import RegitsteredWorkshops from "./RegitsteredWorkshops";
import WishLists from "./WishLists";
import PaymentMethods from "./PaymentMethods";
import ProfileSettings from "./ProfileSettings";
import { ProfileTabLinkType } from "../../../../../interfaces";

const ProfileComponents = ({
	activeTab,
}: {
	activeTab: ProfileTabLinkType;
}) => {
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
				<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
					{myCourses.map((course, i) => (
						<CourseInProgressDisplayCard {...course} key={i} />
					))}
				</div>
			) : activeTab === "My Workshop" ? (
				<RegitsteredWorkshops />
			) : activeTab === "Mentorship" ? (
				<RegisteredMentorships />
			) : activeTab === "Wish Lists" ? (
				<div className="md:px-2 px-5">
					<WishLists />
				</div>
			) : activeTab === "Payment Methods" ? (
				<PaymentMethods />
			) : activeTab === "Profile Settings" ? (
				<ProfileSettings />
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
