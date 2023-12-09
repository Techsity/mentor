import React from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import UserProfilePageTemplate from "../../components/templates/user/profile";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";

const UserProfilePage = () => {
	return <UserProfilePageTemplate />;
};

export default protectedPageWrapper(UserProfilePage);
