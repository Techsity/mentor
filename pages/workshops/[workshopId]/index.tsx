import React from "react";
import WorkShopDetailsPageTemplate from "../../../components/templates/workshop/details";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IWorkshop } from "../../../interfaces";
import workshops from "../../../data/workshops";
import { slugify } from "../../../utils";

type WorkshopPageDetailsProps = {
	workshop: IWorkshop | undefined;
};

const WorkShopDetailsPage = ({ workshop }: WorkshopPageDetailsProps) => {
	return <WorkShopDetailsPageTemplate workshop={workshop} />;
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
