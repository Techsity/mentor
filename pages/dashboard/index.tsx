import React from "react";
import MenteeDashboardTemplate from "../../components/templates/user/dashboard";
import protectedPageWrapper from "../protectedPageWrapper";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";

const DashboardPage = () => {
	const user = useSelector(currentUser);
	return user ? (
		<MenteeDashboardTemplate />
	) : (
		<div className="min-h-screen"></div>
	);
};

export default protectedPageWrapper(DashboardPage);
