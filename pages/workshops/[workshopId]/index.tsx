import React from "react";
import WorkShopDetailsPageTemplate from "../../../components/templates/workshop/details";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IWorkshop } from "../../../interfaces";
import workshops from "../../../data/workshops";
import { slugify } from "../../../utils";
import client from "../../../utils/apolloClient";
import { VIEW_WORKSHOP_DETAILS } from "../../../services/graphql/queries/workshop";
import ResponseMessages from "../../../constants/response-codes";
import { formatGqlError } from "../../../utils/auth";

type WorkshopPageDetailsProps = {
	workshop: IWorkshop | undefined;
	error?: string;
};

const WorkShopDetailsPage = ({ workshop, error }: WorkshopPageDetailsProps) => {
	if (!workshop) {
		console.error({ error });
		return <div className="text-center text-red-500">{error || "Something went wrong"}</div>;
	}
	return <WorkShopDetailsPageTemplate workshop={workshop} />;
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<WorkshopPageDetailsProps>> => {
	const workshopId = ctx.query.workshopId as string;
	if (!workshopId) return { notFound: true };
	// query to fetch workshop based on the "workshopId"
	try {
		const query = client({ ssr: true }).query;
		const {
			data: { viewWorkshop: workshop },
		} = await query<{ viewWorkshop: IWorkshop }, { workshopId: string }>({
			query: VIEW_WORKSHOP_DETAILS,
			variables: { workshopId },
		});
		return { props: { workshop, error: "" } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		if (errorMsg == ResponseMessages.MENTOR_PROFILE_NOT_FOUND)
			return { props: { workshop: undefined, error: errorMsg } };
		return { props: { workshop: undefined, error: "Something went wrong. Please refresh page and try again." } };
	}
};

export default WorkShopDetailsPage;
