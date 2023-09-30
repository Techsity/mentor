import React from "react";
import { GetServerSidePropsContext } from "next";
import { Particles } from "../../../../../components/templates/auth/login-and-signup";
import { useRouter } from "next/router";
import OtpTemplate from "../../../../../components/templates/auth/verification";

const PasswordResetOtpVerificationPage = () => {
	const router = useRouter();
	const token = "toendjsdhjkjckenwd";
	return (
		<OtpTemplate
			next={(otp) => {
				console.log(otp);
				router.push(`/auth/reset-password/${token}`);
			}}
			timeLimit={60}
		/>
	);
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { jwt } = ctx.query;
	// check if jwt exists in the url query
	if (!jwt)
		return { props: {}, redirect: { destination: "/", permanent: true } };
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};
export default PasswordResetOtpVerificationPage;
