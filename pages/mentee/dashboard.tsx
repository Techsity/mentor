import React from "react";
import MenteeDashboardTemplate from "../../components/templates/mentee/dashboard";
import protectedPageWrapper from "../protectedPageWrapper";

const MenteeDashboard = () => {
	return <MenteeDashboardTemplate />;
};

export default protectedPageWrapper(MenteeDashboard);
