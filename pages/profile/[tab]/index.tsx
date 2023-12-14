import React, { useMemo } from "react";
import protectedPageWrapper from "../../protectedPageWrapper";
import ProfileLayout from "../../../components/ui/layout/profile/ProfileLayout";
import { useRouter } from "next/router";
import { ProfileTabLinkType } from "../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/reducers/features/authSlice";
import ProfileSettings from "../../../components/ui/organisms/user/profile/ProfileSettings";
import CourseInProgressDisplayCard from "../../../components/ui/atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../data/courses";
import MentorProfileOverview from "../../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import MentorProfileWorkshop from "../../../components/ui/organisms/user/mentor/workshop/MentorProfileWorkshop";
import PaymentMethods from "../../../components/ui/organisms/user/profile/PaymentMethods";
import RegisteredMentorships from "../../../components/ui/organisms/user/profile/RegisteredMentorships";
import RegitsteredWorkshops from "../../../components/ui/organisms/user/profile/RegitsteredWorkshops";
import WishLists from "../../../components/ui/organisms/user/profile/WishLists";
import WorkshopAndCourseEditTemplate from "../../../components/templates/course/edit";
import EditCourseContent from "../../../components/ui/organisms/course/edit-course/EditCourseContent";
import MentorProfileCourses from "../../../components/ui/organisms/user/mentor/courses/MentorProfileCourses";

const ProfileNavgationContainer = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const tab = router.query.tab as ProfileTabLinkType;
	const myCourses = useMemo(() => courses, []);
	const isEditWorkshop = false;
	const isCourseContentPage = false;

	return (
		<ProfileLayout>
			{isMentor && tab === "overview" ? (
				<div className="animate__animated animate__fadeIn">
					<MentorProfileOverview />
				</div>
			) : tab === "courses" && isMentor ? (
				<MentorProfileCourses />
			) : tab === "my-courses" ? (
				<div className="animate__animated animate__fadeIn">
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
						{myCourses.map((course, i) => (
							<CourseInProgressDisplayCard {...{ course }} key={i} />
						))}
					</div>
				</div>
			) : tab === "workshop" && isMentor ? (
				<MentorProfileWorkshop />
			) : tab === "my-workshop" ? (
				<RegitsteredWorkshops />
			) : tab === "mentorship" ? (
				<RegisteredMentorships />
			) : tab === "wishlists" ? (
				<div className="md:px-2 px-5">
					<WishLists />
				</div>
			) : tab === "payment-methods" ? (
				<PaymentMethods />
			) : (
				tab === "profile-settings" && <ProfileSettings />
			)}
		</ProfileLayout>
	);
};

export default protectedPageWrapper(ProfileNavgationContainer);
