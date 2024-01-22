import React, { useEffect } from "react";
import MentorDetailsTemplate from "../../components/templates/mentor/details";
import { useRouter } from "next/router";
import ScheduleConsultationTemplate from "../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../services/graphql/mutations/mentors";
import { useQuery } from "@apollo/client";

const MentorDetails = () => {
	const router = useRouter();
	const username = router.query.username as string;
	const isConsultationPage = Object.keys(router.query)[0] === "consult";

	const { data, error, loading } = useQuery<{ viewMentor: IMentor }, { viewMentorId: string }>(VIEW_MENTOR_PROFILE, {
		variables: { viewMentorId: username },
	});

	useEffect(() => {
		scrollTo({ top: -6000, behavior: "smooth" });
	}, [data, loading]);

	if (error) console.error({ errorFetchingMentor: JSON.stringify(error) });

	const mentor = data && (data?.viewMentor as IMentor);

	if (isConsultationPage) return mentor && <ScheduleConsultationTemplate {...{ mentor: mentor, loading }} />;
	return !loading && error ? (
		<div className="text-red-600 text-xl h-screen flex justify-center items-center">
			Any error occured. Please refresh page and try again.
		</div>
	) : (
		<MentorDetailsTemplate {...{ mentor: mentor, loading }} />
	);
};

export default MentorDetails;
