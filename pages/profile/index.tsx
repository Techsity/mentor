import React, { FC, useEffect, useMemo, useState } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/ProfileLayout";
import { useSelector } from "react-redux";
import CourseInProgressDisplayCard from "../../components/ui/atom/cards/course/CourseInProgressDisplayCard";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import { ICourse, ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/authSlice";
import courses from "../../data/courses";
import { useQuery } from "@apollo/client";
import { FETCH_USER_SUBSCRIPTIONS } from "../../services/graphql/mutations/user";
import { Subscription } from "../../interfaces/user.interface";
import UserCourseSubcriptions from "../../components/ui/organisms/user/profile/UserCourseSubcriptions";

const UserProfilePage = () => {
	return (
		<ProfileLayout>
			<MainProfile />
		</ProfileLayout>
	);
};
const MainProfile: FC<{ activetab?: ProfileTabLinkType }> = ({ activetab }) => {
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;

	return (
		<>
			{isMentor && activetab === "overview" ? (
				<div className="animate__animated animate__fadeIn">
					<MentorProfileOverview />
				</div>
			) : (
				activetab === "my-courses" && <UserCourseSubcriptions />
			)}
		</>
	);
};
export default protectedPageWrapper(UserProfilePage);
