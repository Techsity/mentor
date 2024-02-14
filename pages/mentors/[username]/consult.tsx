import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import ScheduleConsultationTemplate from "../../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../../services/graphql/mutations/mentors";
import protectedPageWrapper from "../../protectedPageWrapper";

const MentorConsultationPage = () => {
	const router = useRouter();
	const username = router.query.username as string;

	const { data, error, loading } = useQuery<{ viewMentor: IMentor }, { viewMentorId: string }>(VIEW_MENTOR_PROFILE, {
		variables: { viewMentorId: username },
	});

	const mentor = data && (data?.viewMentor as IMentor);
	return !loading && error && !mentor ? (
		<div className="text-red-600 text-xl h-screen flex justify-center items-center">
			Any error occured. Please refresh page and try again.
		</div>
	) : (
		<ScheduleConsultationTemplate {...{ mentor: mentor, loading }} />
	);
};

export default protectedPageWrapper(MentorConsultationPage);
