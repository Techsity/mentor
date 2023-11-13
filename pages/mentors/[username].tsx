import { GetServerSidePropsContext } from "next";
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { username } = ctx.query;
	const mentor: IMentor | undefined = await mentors.find(
		(mentor) => mentor.username === username,
	);
	if (!mentor || mentor == undefined)
		return {
			redirect: { destination: "/", permanent: false },
			props: {},
		};
	return { props: { mentor } };
};

export default MentorDetails;
