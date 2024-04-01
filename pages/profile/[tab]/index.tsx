import React from "react";
import protectedPageWrapper from "../../protectedPageWrapper";
import ProfileLayout from "../../../components/ui/layout/ProfileLayout";
import { useRouter } from "next/router";
import { ProfileTabLinkType } from "../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/reducers/auth/authSlice";
import ProfileSettings from "../../../components/ui/organisms/user/profile/ProfileSettings";
import MentorProfileOverview from "../../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import MentorProfileWorkshop from "../../../components/ui/organisms/user/mentor/workshop/MentorProfileWorkshop";
import PaymentMethods from "../../../components/ui/organisms/user/profile/PaymentMethods";
import RegisteredMentorships from "../../../components/ui/organisms/user/profile/RegisteredMentorships";
import RegitsteredWorkshops from "../../../components/ui/organisms/user/profile/RegitsteredWorkshops";
import WishLists from "../../../components/ui/organisms/user/profile/WishLists";
import MentorProfileCourses from "../../../components/ui/organisms/user/mentor/courses/MentorProfileCourses";
import UserCourseSubcriptions from "../../../components/ui/organisms/user/profile/UserCourseSubcriptions";

const ProfileNavgationContainer = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const tab = router.query.tab as ProfileTabLinkType;

	return (
		<ProfileLayout>
			<div className="md:px-10 lg:px-0">
				{isMentor && tab === "overview" ? (
					<div className="animate__animated animate__fadeIn">
						<MentorProfileOverview />
					</div>
				) : tab === "courses" && isMentor ? (
					<MentorProfileCourses />
				) : tab === "my-courses" ? (
					<UserCourseSubcriptions />
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
				) : tab === "payments" ? (
					<PaymentMethods />
				) : tab === "payment-methods" ? (
					<PaymentMethods />
				) : (
					tab === "settings" && <ProfileSettings />
				)}
			</div>
		</ProfileLayout>
	);
};

export default protectedPageWrapper(ProfileNavgationContainer);
