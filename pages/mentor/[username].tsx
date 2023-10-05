import { GetServerSidePropsContext } from "next";
import React from "react";
import MentorDetailsTemplate from "../../components/templates/mentor/details";
import mentors from "../../data/mentors";
import { IMentor } from "../../interfaces";

const MentorDetails = ({ mentor }: { mentor: IMentor }) => {
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
