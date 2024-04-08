import React from "react";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import MentorshipSessionCallTemplate from "../../../components/templates/user/session";
import { IAppointment } from "../../../interfaces/mentor.interface";
import { checkAuthServerSide, formatGqlError, logoutUser } from "../../../utils/auth";
import client from "../../../utils/apolloClient";
import { VIEW_APPOINTMENT } from "../../../services/graphql/queries/user";
import TestCallMedia from "../../../components/ui/organisms/workshop/live/TestCallMedia";

import MentorshipSessionProvider, { useMentorshipSessionContext } from "../../../context/mentorship-session.context";

type Props = {
	appointment: IAppointment | null;
	error?: string;
};

const MentorshipSessionCall = ({ appointment, error }: Props) => {
	if (!appointment || error) {
		return <div className="">{error || "Something went wrong"}</div>;
	}

	return (
		<MentorshipSessionProvider appointment={appointment as IAppointment}>
			<MentorshipSessionCallTemplate />
		</MentorshipSessionProvider>
	);
};

// protectedPageWrapper
export default MentorshipSessionCall;

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
	const authToken = checkAuthServerSide(ctx.req);
	if (!authToken) {
		logoutUser();
		return {
			props: { appointment: null },
			redirect: { permanent: true, destination: "/auth?login" },
		};
	}
	const appointmentId = ctx.query.appointmentId as string;
	const query = client({ ssr: true, authToken }).query;
	try {
		const {
			data: appointment,
			error,
			errors,
		} = await query<{ viewAppointment: IAppointment }, { appointmentId: string }>({
			query: VIEW_APPOINTMENT,
			variables: { appointmentId },
		});
		if (!appointment || errors || error) {
			const errMsg = formatGqlError(error);
			return { props: { appointment: null, error: errMsg || "Something went wrong" } };
		}
		return { props: { appointment: appointment.viewAppointment } };
	} catch (error) {
		console.log({ error });
		const errMsg = formatGqlError(error);
		return { props: { appointment: null, error: errMsg } };
	}
};
