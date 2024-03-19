import React from "react";
import WorkshopRegistrationPageTemplate from "../../../components/templates/workshop/registration";
import protectedPageWrapper from "../../protectedPageWrapper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import ResponseMessages from "../../../constants/response-codes";
import { IWorkshop } from "../../../interfaces";
import { VIEW_WORKSHOP_DETAILS } from "../../../services/graphql/queries/workshop";
import client from "../../../utils/apolloClient";
import { formatGqlError } from "../../../utils/auth";

type WorkshopPageDetailsProps = {
	workshop: IWorkshop | undefined;
	error?: string;
};

const WorkshopRegistrationPage = () => {
	return <WorkshopRegistrationPageTemplate />;
};

export default protectedPageWrapper(WorkshopRegistrationPage);

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
			error,
		} = await query<{ viewWorkshop: IWorkshop }, { workshopId: string }>({
			query: VIEW_WORKSHOP_DETAILS,
			variables: { workshopId },
		});
		return { props: { workshop } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		if (errorMsg == ResponseMessages.MENTOR_PROFILE_NOT_FOUND)
			return { props: { workshop: undefined, error: errorMsg } };
		return { props: { workshop: undefined, error: "Something went wrong. Please refresh page and try again." } };
	}
};
