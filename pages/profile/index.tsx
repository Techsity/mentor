import React, { FC, useCallback, useEffect, useState } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/ProfileLayout";
import { useSelector } from "react-redux";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import { ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/auth/authSlice";
import UserCourseSubcriptions from "../../components/ui/organisms/user/profile/UserCourseSubcriptions";
import { useModal } from "../../context/modal.context";
import PromptModal from "../../components/ui/atom/modals/PromptModal";
import { activeProfile } from "../../redux/reducers/userSlice";
import { useRouter } from "next/router";

const UserProfilePage = () => {
	return (
		<ProfileLayout>
			<MainProfile />
		</ProfileLayout>
	);
};

const messages = {
	regular:
		"We noticed that your mentor account needs to be updated.\n Updating your profile can help your account get more visibility and enable us to provide better customer support.",
	availability: "We noticed that your mentorship availability slots have not been set.",
};

const MainProfile: FC<{ activetab?: ProfileTabLinkType }> = ({ activetab }) => {
	const user = useSelector(currentUser);
	const { openModal } = useModal();
	const router = useRouter();
	const isMentor = user?.mentor;
	const currentProfile = useSelector(activeProfile);
	const mentorProfile = user?.mentor;
	const prefix = "Hi there! ";
	const suffix = " To update your mentor profile, simply click on the 'Continue' button below.";

	const showAlert = useCallback(() => {
		let title = "Complete your mentor profile";
		let msg = messages.regular;
		const { availability } = mentorProfile || {};
		if (!availability || availability?.length <= 0) {
			msg = messages.availability;
		}
		openModal(
			<PromptModal
				next={() => router.push({ pathname: router.pathname.concat("/settings"), hash: "mentor" })}
				title={title}
				body={prefix.concat(msg).concat(suffix)}
			/>,
			{ animate: true, closeOnBackgroundClick: false, showCloseIcon: false },
		);
	}, []);

	useEffect(() => {
		if (mentorProfile) if (isMentor && currentProfile === "mentor") showAlert();
	}, [mentorProfile]);

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
