import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import React from "react";
import MentorDetailsTemplate from "../../components/templates/mentor/details";
import mentors from "../../data/mentors";
import { useRouter } from "next/router";
import ScheduleConsultationTemplate from "../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../interfaces/mentor.interface";
import * as API from "../../services/api";
import { VIEW_MENTOR_PROFILE } from "../../services/graphql/mutations/mentors";
import { useQuery } from "@apollo/client";
import client from "../../utils/apolloClient";

// const MentorDetails = ({ mentor, error }: { mentor: IMentor; error?: any }) => {
const MentorDetails = () => {
	const router = useRouter();
	const username = router.query.username as string;
	const isConsultationPage = Object.keys(router.query)[0] === "consult";

	const { data, error, loading } = useQuery<{ viewMentor: IMentor }, { viewMentorId: string }>(VIEW_MENTOR_PROFILE, {
		variables: { viewMentorId: username },
	});

	if (error) console.error({ errorFetchingMentor: error });
	// else if (data) console.log({ mentorData: data });

	const mentor = data && (data?.viewMentor as IMentor);

	if (isConsultationPage) return mentor && <ScheduleConsultationTemplate {...{ mentor: mentor, loading }} />;
	return !loading ? (
		mentor && !mentor?.user ? (
			<div className="text-red-600 text-xl h-screen flex justify-center items-center">Mentor is unavailable</div>
		) : (
			error && (
				<div className="text-red-600 text-xl h-screen flex justify-center items-center">
					Any error occured. Please refresh page and try again.
				</div>
			)
		)
	) : (
		<MentorDetailsTemplate {...{ mentor: mentor, loading }} />
	);
};

// export const getServerSideProps = async (
// 	ctx: GetServerSidePropsContext,
// ): Promise<GetServerSidePropsResult<{ mentor: IMentor | null; error?: any }>> => {
// 	const { username } = ctx.query;

// 	const { data, error, loading } = await client({ ssr: true }).query<
// 		{ viewMentor: IMentor },
// 		{ viewMentorId: string }
// 	>({
// 		query: VIEW_MENTOR_PROFILE,
// 		variables: { viewMentorId: username as string },
// 	});
// 	const mentor = data.viewMentor;

// 	if (error) return { props: { mentor, error } };
// 	if (!mentor) return { notFound: true };
// 	if (!mentor.user) return { notFound: true };
// 	return { props: { mentor } };
// };

export default MentorDetails;

//
//
//
//
// export const getServerSideProps = async (
// 	ctx: GetServerSidePropsContext,
// 	// ): Promise<GetServerSidePropsResult<{ mentor: IMentor }>> => {
// ): Promise<GetServerSidePropsResult<any>> => {
// 	const { username } = ctx.query;
// 	const mentor = await API.gqlRequestInstance({ ssr: true }).request(VIEW_MENTOR_PROFILE, { viewMentorId: username });
// 	console.log({ mentor: mentor });
// 	// if (!mentor) return { notFound: true };
// 	return { props: {} };
// };
