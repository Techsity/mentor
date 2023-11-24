import React from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import UserProfilePageTemplate from "../../components/templates/user/profile";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";
import MyMentorProfilePageTemplate from "../../components/templates/user/profile/my-mentor-profile";

const UserProfilePage = () => {
	const user = useSelector(currentUser);

	return user?.mentor ? (
		<MyMentorProfilePageTemplate />
	) : (
		<UserProfilePageTemplate />
	);
};

export default protectedPageWrapper(UserProfilePage);
