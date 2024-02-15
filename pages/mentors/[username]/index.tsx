import React, { useEffect } from "react";
import MentorDetailsTemplate from "../../../components/templates/mentor/details";
import { useRouter } from "next/router";
import { IMentor } from "../../../interfaces/mentor.interface";
import { VIEW_MENTOR_PROFILE } from "../../../services/graphql/mutations/mentors";
import { useQuery } from "@apollo/client";
import mentors from "../../../data/mentors";
import protectedPageWrapper from "../../protectedPageWrapper";

const MentorDetails = () => {
	const router = useRouter();
	const username = router.query.username as string;

	const { data, error, loading } = useQuery<{ viewMentor: IMentor }, { viewMentorId: string }>(VIEW_MENTOR_PROFILE, {
		variables: { viewMentorId: username },
	});

	useEffect(() => {
		scrollTo({ top: -6000, behavior: "smooth" });
	}, [data, loading]);

	if (error) console.error({ errorFetchingMentor: JSON.stringify(error) });

	//! The mentor[0] is temporary
	const mentor = (data && (data?.viewMentor as IMentor)) || mentors[0];

	return !loading && error && !mentor ? (
		<div className="text-red-600 text-xl h-screen flex justify-center items-center">
			Any error occured. Please refresh page and try again.
		</div>
	) : (
		<MentorDetailsTemplate {...{ mentor: mentor, loading }} />
	);
};

export default MentorDetails;
// export default protectedPageWrapper(MentorDetails);
