import React, { useState } from "react";
import ProfileNavCard from "../../../ui/atom/cards/profile/ProfileNavCard";
import courses from "../../../../data/courses";
import CourseInProgressDisplayCard from "../../../ui/atom/cards/course/CourseInProgressDisplayCard";
import EditProfileCard from "../../../ui/atom/cards/profile/EditProfileCard";

const UserProfilePageTemplate = () => {
	const tabLinks: string[] = [
		// "My Courses",
		"My Workshop",
		"Mentorship",
		"Wish Lists",
		"Payment Methods",
		"Profile Settings",
	];
	const [activeTab, setActiveTab] = useState<string>(tabLinks[0]);
	const ongoingCourses = courses[0].categories[0].availableCourses;

	return (
		<>
			{/* xs:pl-12 lg:pl-16 pt-10 */}
			<div className="flex flex-col xl:gap-6 xl:flex-row item-start w-full h-full">
				<div className="xs:px-12 lg:px-0 lg:pl-12 pt-10 sticky z-10 top-11 md:top-[9dvh] xl:top-20 w-auto xl:w-[30%] h-[50%]">
					<div className="w-full overflow-hidden hide-scroll-bar">
						<ProfileNavCard
							tabLinks={tabLinks}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</div>
				<div className="flex-grow py-10 xl:order-none order-last min-h-screen max-w-3xl">
					<h1 className="font-medium text-xl mb-5">My Courses</h1>
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center">
						{ongoingCourses.map((course, i) => (
							<CourseInProgressDisplayCard {...course} key={i} />
						))}
					</div>
				</div>
				<div className="xl:sticky top-20 bg-[#F6F9F8] p-4 w-auto xl:w-[35%] min-h-screen h-full mx-3 xs:mx-12 lg:mx-0">
					<EditProfileCard />
				</div>
			</div>
			<div className="bg-[#70C5A1] min-h-20 p-6 min-w-screen flex justify-center">
				<div className="flex flex-col justify-center items-center text-white">
					<h1 className="text-xl font-medium">Mentör by Techsity</h1>
					<p className="">Copyright (c) 2023</p>
					<p className="font-[300] text-sm tracking-wide">
						www.techsity.io
					</p>
				</div>
			</div>
		</>
	);
};

export default UserProfilePageTemplate;
