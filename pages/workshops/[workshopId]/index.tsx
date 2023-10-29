import React from "react";
import WorkShopDetailsPageTemplate from "../../../components/templates/workshop/details";
import protectedPageWrapper from "../../protectedPageWrapper";

const WorkShopDetailsPage = () => {
	return <WorkShopDetailsPageTemplate />;
};

export default protectedPageWrapper(WorkShopDetailsPage);
