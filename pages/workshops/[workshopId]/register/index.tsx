import React from "react";
import WorkshopRegistrationPageTemplate from "../../../../components/templates/workshop/registration";
import protectedPageWrapper from "../../../protectedPageWrapper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import ResponseMessages from "../../../../constants/response-codes";
import { IWorkshop } from "../../../../interfaces";
import { VIEW_WORKSHOP_DETAILS } from "../../../../services/graphql/queries/workshop";
import client from "../../../../utils/apolloClient";
import { formatGqlError } from "../../../../utils/auth";

type WorkshopPageDetailsProps = {
	workshop: IWorkshop | null;
	error?: string;
};

const WorkshopRegistrationPage = ({ workshop, error }: WorkshopPageDetailsProps) => {
	if (!workshop) {
		console.error({ error });
		return (
			<div className="h-screen text-center flex items-center justify-center text-red-500">
				{error || "Something went wrong"}
			</div>
		);
	}
	return <WorkshopRegistrationPageTemplate {...{ workshop }} />;
};

export default protectedPageWrapper(WorkshopRegistrationPage);

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<WorkshopPageDetailsProps>> => {
	const workshopId = ctx.query.workshopId as string;
	if (!workshopId) return { notFound: true };
	try {
		const query = client({ ssr: true }).query;
		const {
			data: { viewWorkshop: workshop },
		} = await query<{ viewWorkshop: IWorkshop }, { workshopId: string }>({
			query: VIEW_WORKSHOP_DETAILS,
			variables: { workshopId },
		});
		return { props: { workshop } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		if (errorMsg == ResponseMessages.MENTOR_PROFILE_NOT_FOUND)
			return { props: { workshop: null, error: errorMsg } };
		return { props: { workshop: null, error: "Something went wrong. Please refresh page and try again." } };
	}
};
