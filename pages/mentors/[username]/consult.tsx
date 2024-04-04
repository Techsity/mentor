import React, { useEffect } from "react";
import ScheduleConsultationTemplate from "../../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../../services/graphql/queries/mentor";
import protectedPageWrapper from "../../protectedPageWrapper";
import NewsLetterForm from "../../../components/ui/atom/forms/NewsLetterForm";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import ResponseMessages from "../../../constants/response-codes";
import client from "../../../utils/apolloClient";
import { formatGqlError } from "../../../utils/auth";

type MentorDetailsProps = { mentor: IMentor; error?: string };

const MentorConsultationPage = (props: MentorDetailsProps) => {
	const { mentor, error } = props;

	if (!mentor && error) {
		console.error({ errorFetchingMentor: JSON.stringify(error) });
		return (
			<div className="text-red-600 text-lg min-h-screen w-full flex justify-center items-center">
				{error || "Network error. Please refresh page and try again."}
			</div>
		);
	}

	return (
		<>
			<ScheduleConsultationTemplate {...{ mentor: mentor }} />
			{/* <>
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</> */}
		</>
	);
};

export default protectedPageWrapper(MentorConsultationPage);

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
		return { props: { mentor, error: "" } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		if (errorMsg == ResponseMessages.MENTOR_PROFILE_NOT_FOUND) return { props: { error: errorMsg } };
		return { props: { error: "Something went wrong. Please refresh page and try again." } };
	}
};
