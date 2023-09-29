import React from "react";
import OtpTemplate from "../../../../../components/templates/auth/verification";
import { GetServerSidePropsContext } from "next";
import { Particles } from "../../../../../components/templates/auth";

const PasswordResetOtpVerificationPage = () => {
	return (
		<OtpTemplate
			handleSubmit={(e) => {
				e.preventDefault();
			}}
		/>
	);
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { jwt } = ctx.query;
	// check if jwt exists in the token
	if (!jwt)
		return { props: {}, redirect: { destination: "/", permanent: true } };
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};
export default PasswordResetOtpVerificationPage;
