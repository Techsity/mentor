import React, { useEffect } from "react";
import MentorDetailsTemplate from "../../../components/templates/mentor/details";
import { IMentor } from "../../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../../services/graphql/mutations/mentors";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import client from "../../../utils/apolloClient";
import { formatGqlError } from "../../../utils/auth";
import ResponseMessages from "../../../constants/response-codes";

type MentorDetailsProps = { mentor: IMentor; error?: string };

const MentorDetails = (props: MentorDetailsProps) => {
	const { mentor, error } = props;
	useEffect(() => {
		scrollTo({ top: -6000, behavior: "smooth" });
	}, []);

	if (!mentor && error) {
		console.error({ errorFetchingMentor: JSON.stringify(error) });

		return (
			<div className="text-red-600 text-lg min-h-screen w-full flex justify-center items-center">
				{error || "Network error. Please refresh page and try again."}
			</div>
		);
	}

	return <MentorDetailsTemplate {...{ mentor: mentor }} />;
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Partial<MentorDetailsProps>>> => {
	const username = String(ctx.query.username);
	try {
		const query = client({ ssr: true }).query;
		const {
			data: { viewMentor: mentor },
		} = await query<{ viewMentor: IMentor }, { viewMentorId: string }>({
			query: VIEW_MENTOR_PROFILE,
			variables: { viewMentorId: username },
		});
		// if (error) {
		// 	console.error(error);
		// 	return { props: { mentor, error: "" } };
		// }
		return { props: { mentor, error: "" } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		if (errorMsg == ResponseMessages.MENTOR_PROFILE_NOT_FOUND) return { props: { error: errorMsg } };
		return { props: { error: "Something went wrong. Please refresh page and try again." } };
	}
};

export default MentorDetails;
