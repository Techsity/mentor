import React from "react";
import WorkshopRegistrationPageTemplate from "../../../components/templates/workshop/registration";
import protectedPageWrapper from "../../protectedPageWrapper";

const WorkshopRegistrationPage = () => {
	return <WorkshopRegistrationPageTemplate />;
};

export default protectedPageWrapper(WorkshopRegistrationPage);
