import React, { useMemo } from "react";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../data/courses";
import RegisteredMentorships from "./RegisteredMentorships";
import RegitsteredWorkshops from "./RegitsteredWorkshops";
import WishLists from "./WishLists";
import PaymentMethods from "./PaymentMethods";
import ProfileSettings from "./ProfileSettings";
import { ProfileTabLinkType } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import MentorProfileCourses from "../mentor/courses/MentorProfileCourses";
import { PrimaryButton } from "../../../atom/buttons";
import { useRouter } from "next/router";
import EditCourseTemplate from "../../../../templates/course/edit";
import EditCourseContent from "../../course/edit-course/EditCourseContent";
import MentorProfileOverview from "../mentor/MentorProfileOverview.tsx";
import MentorProfileWorkshop from "../mentor/workshop/MentorProfileWorkshop";

const ProfileComponents = ({ activeTab }: { activeTab: ProfileTabLinkType }) => {
	const router = useRouter();
	const myCourses = useMemo(() => courses, []);
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;

	const isEditCourse = useMemo(() => {
		return (router.asPath.split("#")[1]?.split("/")[2] as "edit") || "";
	}, [router]);

	const isContentPage = useMemo(() => router.asPath.split("#")[2] as "content", [router]);

	return (
		<>
			<div className="flex justify-between items-center mb-5 animate__animated animate__fadeInDown sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">
					{isEditCourse && !isContentPage
						? "edit course"
						: isEditCourse && isContentPage
						? "edit course content"
						: activeTab}
				</h1>
				{isMentor &&
					activeTab === "Courses" &&
					(!isEditCourse ? (
						<PrimaryButton title="+ New Course" className="bg-[#FFB100] text-[#000] p-2 px-4" />
					) : (
						<div className="flex items-center gap-3">
							<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
							<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
						</div>
					))}
			</div>
			{
				activeTab === "Overview" && isMentor ? (
					<div className="animate__animated animate__fadeIn">
						<MentorProfileOverview />
					</div>
				) : activeTab === "Courses" && isMentor ? (
					isEditCourse && !isContentPage ? (
						<EditCourseTemplate />
					) : isEditCourse && isContentPage ? (
						<EditCourseContent />
					) : (
						<MentorProfileCourses />
					)
				) : activeTab === "My Courses" ? (
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						{myCourses.map((course, i) => (
							<CourseInProgressDisplayCard {...{ course }} key={i} />
						))}
					</div>
				) : activeTab === "Workshop" && isMentor ? (
					<MentorProfileWorkshop />
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
				) : (
					activeTab === "Profile Settings" && <ProfileSettings />
				)
				// : (
				// 	<>
				// 		<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
				// 			{myCourses.map((course, i) => (
				// 				<CourseInProgressDisplayCard {...{ course }} key={i} />
				// 			))}
				// 		</div>
				// 	</>
				// )
			}
		</>
	);
};

export default ProfileComponents;
