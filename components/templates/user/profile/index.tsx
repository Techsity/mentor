import React, { useEffect, useMemo, useState } from "react";
import ProfileNavCard from "../../../ui/atom/cards/profile/ProfileNavCard";
import EditProfileCard from "../../../ui/atom/cards/profile/EditProfileCard";
import ProfileComponents from "../../../ui/organisms/user/profile/ProfileComponents";
import { ProfileTabLinkType } from "../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/features/authSlice";
import { useRouter } from "next/router";

const UserProfilePageTemplate = () => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const isMentor = user?.mentor;
	const tabLinks: ProfileTabLinkType[] = isMentor
		? ["Overview", "Courses", "Workshop", "Mentorship", "Wish Lists", "Payments", "Profile Settings", "Edit Course"]
		: ["My Courses", "My Workshop", "Mentorship", "Wish Lists", "Payment Methods", "Profile Settings"];

	const [activeTab, setActiveTab] = useState<ProfileTabLinkType>(tabLinks[0]);

	const isEditCourse = useMemo(() => {
		return (
			Boolean(
				(router.asPath.split("#")[1]?.split("/")[0] as "courses") === "courses" &&
					(router.asPath.split("#")[1]?.split("/")[2] as "edit"),
			) || false
		);
	}, [router]);

	const isEditWorkshop = useMemo(() => {
		return (
			Boolean(
				(router.asPath.split("#")[1]?.split("/")[0] as "workshop") === "workshop" &&
					(router.asPath.split("#")[1]?.split("/")[2] as "edit"),
			) || false
		);
	}, [router]);

	useEffect(() => {
		if (isEditCourse) setActiveTab("Courses");
		if (isEditWorkshop) setActiveTab("Workshop");
	}, [router]);

	return (
		<>
			<div className="flex lg:grid grid-cols-6 xl:flex flex-col xl:gap-6 xl:flex-row item-start w-full h-full min-w-screen">
				<div className="col-span-2 px-4 md:px-12 xl:px-0 xl:pl-12 pt-10 sticky z-10 top-11 md:top-[9dvh] xl:top-20 w-full xl:max-w-xs 2xl:max-w-sm h-[50%]">
					<div className="w-full overflow-hidden hide-scroll-bar">
						<ProfileNavCard
							tabLinks={tabLinks.filter((nav) => nav !== "Edit Course")}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</div>
				<div
					className={`flex-grow py-10 min-h-screen w-full px-4 md:px-12 lg:pr-12 lg:px-0 col-span-4 h-full${
						isEditCourse ? "xl:pr:12" : "xl:pr-0"
					}`}>
					<ProfileComponents {...{ isEditCourse, isEditWorkshop, activeTab }} />
				</div>
				{!isEditCourse && (
					<div className="hidden xl:inline-block xl:sticky top-20 xl:order-none order-last bg-[#F6F9F8] p-4 w-full xl:max-w-xs 2xl:max-w-sm xl:min-h-[90dvh] h-full px-6 col-span-6">
						{/* <div className="xl:sticky top-20 bg-[#F6F9F8] p-4 w-auto xl:w-[30%] min-h-screen h-full mx-3 xs:mx-12 lg:mx-0"> */}
						<EditProfileCard />
					</div>
				)}
			</div>
			<div className="bg-[#70C5A1] min-h-20 p-6 min-w-screen flex justify-center">
				<div className="flex flex-col justify-center items-center text-white">
					<h1 className="text-xl font-medium">Mentör by Techsity</h1>
					<p className="">Copyright (c) 2023</p>
					<p className="font-[300] text-sm tracking-wide">www.techsity.io</p>
				</div>
			</div>
		</>
	);
};

export default UserProfilePageTemplate;
