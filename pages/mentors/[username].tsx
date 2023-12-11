import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import React from "react";
import MentorDetailsTemplate from "../../components/templates/mentor/details";
import mentors from "../../data/mentors";
import { useRouter } from "next/router";
import ScheduleConsultationTemplate from "../../components/templates/mentor/schedule-consultation";
import { IMentor } from "../../interfaces/mentor.interface";

const MentorDetails = ({ mentor }: { mentor: IMentor }) => {
	const router = useRouter();
	const isConsultationPage = router.asPath.split("?")[1] === "consult";

	if (isConsultationPage) return <ScheduleConsultationTemplate {...mentor} />;
	return <MentorDetailsTemplate {...mentor} />;
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ mentor: IMentor }>> => {
	const { username } = ctx.query;
	const mentor = await mentors.find((mentor) => mentor.user.name === username);
	if (!mentor) return { notFound: true };
	return { props: { mentor } };
};

export default MentorDetails;
