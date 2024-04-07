import React, { useRef, useState } from "react";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import MentorshipSessionCallTemplate from "../../../components/templates/user/session";
import { IAppointment } from "../../../interfaces/mentor.interface";
import { checkAuthServerSide, formatGqlError, logoutUser } from "../../../utils/auth";
import client from "../../../utils/apolloClient";
import { VIEW_APPOINTMENT } from "../../../services/graphql/queries/user";
import TestCallMedia, { MediaPermission } from "../../../components/ui/organisms/workshop/live/TestCallMedia";
import useMentorshipSession from "../../../hooks/useMentorshipSession";

type Props = {
	appointment: IAppointment | null;
	error?: string;
};

const MentorshipSessionCall = ({ appointment, error }: Props) => {
	const {
		handleAllowJoinSession,
		connected,
		errorMessage,
		handleConnection,
		loading,
		localStreamRef,
		setStream,
		stream,
		client,
		newJoinRequest,
	} = useMentorshipSession(appointment as IAppointment);

	const handleJoin = (permission: MediaPermission) => {
		// Check and update permissions
		handleConnection();
	};

	if (!appointment || error) {
		return <div className="">{error || "Something went wrong"}</div>;
	}

	return !connected && !errorMessage ? (
		<TestCallMedia {...{ loading, localStreamRef, onPermissionSet: handleJoin, setStream, stream }} />
	) : connected ? (
		<MentorshipSessionCallTemplate
			{...{
				appointment,
				stream,
				socket: client,
				newJoinRequest,
				handleNewJoinRequest: handleAllowJoinSession,
			}}
		/>
	) : (
		<span>{errorMessage || "Something went wrong"}</span>
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
