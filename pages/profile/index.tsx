import React from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import UserProfilePageTemplate from "../../components/templates/user/profile";

const UserProfilePage = () => {
	return <UserProfilePageTemplate />;
};

export default protectedPageWrapper(UserProfilePage);
