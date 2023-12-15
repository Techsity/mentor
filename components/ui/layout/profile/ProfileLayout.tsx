import React, { ReactNode, useEffect, useMemo, useState } from "react";
import ProfileNavCard from "../../atom/cards/profile/ProfileNavCard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ProfileTabLinkType } from "../../../../interfaces";
import { currentUser } from "../../../../redux/reducers/features/authSlice";
import EditProfileCard from "../../atom/cards/profile/EditProfileCard";
import { PrimaryButton } from "../../atom/buttons";

type Props = { children: ReactNode; onTabUpdate?: (tab: ProfileTabLinkType) => void };

const ProfileLayout = ({ children }: Props) => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const isMentor = user?.mentor;

	const { tab, id } = router.query as { id: string | undefined; tab: ProfileTabLinkType };

	const tabLinks: ProfileTabLinkType[] = isMentor
		? ["overview", "courses", "workshop", "mentorship", "wishlists", "payments", "profile-settings", "edit-course"]
		: ["my-courses", "my-workshop", "mentorship", "wishlists", "payment-methods", "profile-settings"];

	const [activeTab, setActiveTab] = useState<ProfileTabLinkType>("my-courses");

	const isEditCourse = useMemo(() => {
		return Boolean(tab === "courses" && typeof id !== "undefined");
	}, [router]);

	const isEditWorkshop = useMemo(() => {
		return Boolean(tab === "workshop" && typeof id !== "undefined");
	}, [router]);

	const isCourseContentPage = useMemo(() => {
		return Boolean(
			tab === "courses" &&
				typeof id !== "undefined" &&
				router.asPath.split("/")[router.asPath.split("/").length - 1] === "content",
		);
	}, [router]);

	const isNewItemPage = useMemo(() => {
		return (
			Boolean(tab === "courses" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new") ||
			Boolean(tab === "workshop" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new") ||
			Boolean(tab === "courses" && router.asPath.split("/")[router.asPath.split("/").length - 2] === "new") ||
			Boolean(tab === "workshop" && router.asPath.split("/")[router.asPath.split("/").length - 2] === "new")
		);
	}, [router]);

	useEffect(() => {
		if (!tab) setActiveTab(tabLinks[0]);
	}, [tab, router]);

	return (
		<>
			<div className="flex lg:grid grid-cols-6 xl:flex flex-col xl:gap-6 xl:flex-row item-start w-full h-full min-w-screen">
				<div className="col-span-2 px-4 md:px-12 xl:px-0 xl:pl-12 pt-10 sticky z-10 top-11 md:top-[9dvh] xl:top-20 w-full xl:max-w-xs 2xl:max-w-sm h-[50%]">
					<div className="w-full overflow-hidden hide-scroll-bar">
						<ProfileNavCard
							tabLinks={tabLinks.filter((nav) => nav !== "edit-course")}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</div>
				<div
					className={`flex-grow py-10 min-h-screen w-full px-4 col-span-4 h-full ${
						isEditCourse ? "xl:pr-12" : isEditWorkshop ? "xl:pr-12" : "xl:pr-0"
					}`}>
					{!isEditCourse && !isEditWorkshop && !isCourseContentPage && !isNewItemPage && (
						<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn lg:sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
							<h1 className="capitalize">{activeTab.split("-").join(" ")}</h1>
							{tab === "courses" && (
								<PrimaryButton
									style={{ color: "#000" }}
									title="+ New Course"
									className="bg-[#FFB100] p-2 px-4"
									link="/profile/courses/new"
								/>
							)}
						</div>
					)}

					{React.Children.map(children, (child) => {
						if (React.isValidElement(child)) {
							return React.cloneElement<any>(child, { activeTab });
						}
						return child;
					})}
				</div>
				{isEditCourse ? null : isEditWorkshop ? null : (
					<div className="hidden xl:inline-block xl:sticky top-20 xl:order-none order-last bg-[#F6F9F8] p-4 w-full xl:max-w-xs 2xl:max-w-sm xl:min-h-[90dvh] h-full px-6 col-span-6">
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

export default ProfileLayout;
