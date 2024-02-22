import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import ScheduleConsultationTemplate from "../../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../../services/graphql/mutations/mentors";
import protectedPageWrapper from "../../protectedPageWrapper";
import NewsLetterForm from "../../../components/ui/atom/forms/NewsLetterForm";

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
		<>
			<ScheduleConsultationTemplate {...{ mentor: mentor, loading }} />
			<>
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</>
		</>
	);
};

export default protectedPageWrapper(MentorConsultationPage);
