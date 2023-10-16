import React from "react";
import MenteeDashboardTemplate from "../../components/templates/mentee/dashboard";
import protectedPageWrapper from "../protectedPageWrapper";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/authSlice";

const DashboardPage = () => {
	const user = useSelector(currentUser);
	return user && user.role === "mentee" ? (
		<MenteeDashboardTemplate />
	) : (
		<div className="min-h-screen"></div>
	);
};

export default protectedPageWrapper(DashboardPage);
