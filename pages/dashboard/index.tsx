import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";
import MenteeDashboardTemplate from "../../components/templates/user/dashboard";
import protectedPageWrapper from "../protectedPageWrapper";

const DashboardPage = () => {
	const user = useSelector(currentUser);
	return user ? <MenteeDashboardTemplate /> : <div className="min-h-screen"></div>;
};

export default protectedPageWrapper(DashboardPage);
