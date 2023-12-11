import React from "react";
import WorkShopDetailsPageTemplate from "../../../components/templates/workshop/details";
import { useRouter } from "next/router";
import WorkshopRegistrationPageTemplate from "../../../components/templates/workshop/registration";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IWorkshop } from "../../../interfaces";
import workshops from "../../../data/workshops";
import { slugify } from "../../../utils";

type WorkshopPageDetailsProps = {
	workshop: IWorkshop | undefined;
};

const WorkShopDetailsPage = ({ workshop }: WorkshopPageDetailsProps) => {
	const router = useRouter();
	const pageKey = Object.keys(router.query)[0] as string;
	return pageKey === "register" ? (
		<WorkshopRegistrationPageTemplate />
	) : (
		<WorkShopDetailsPageTemplate workshop={workshop} />
	);
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<WorkshopPageDetailsProps>> => {
	const workshopId = ctx.query.workshopId as string;
	if (!workshopId) return { notFound: true };
	// query to fetch workshop based on the "workshopId"
	const workshop = workshops.find((workshop) => slugify(workshop.title) === slugify(workshopId));
	return { props: { workshop } };
};

export default WorkShopDetailsPage;
