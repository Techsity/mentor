import React from "react";
import WorkShopDetailsPageTemplate from "../../../components/templates/workshop/details";
import { useRouter } from "next/router";
import WorkshopRegistrationPageTemplate from "../../../components/templates/workshop/registration";

const WorkShopDetailsPage = () => {
	const router = useRouter();
	const pageKey = Object.keys(router.query)[0] as string;
	return pageKey === "register" ? (
		<WorkshopRegistrationPageTemplate />
	) : (
		<WorkShopDetailsPageTemplate />
	);
};

export default WorkShopDetailsPage;
