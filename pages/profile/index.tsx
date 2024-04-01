import React, { FC } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/ProfileLayout";
import { useSelector } from "react-redux";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import { ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/auth/authSlice";
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
