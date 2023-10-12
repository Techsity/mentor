import { GetServerSidePropsContext } from "next";
import React from "react";
import ResetNewPasswordTemplate from "../../../components/templates/auth/password/reset";
import { useRouter } from "next/router";
import ResetPasswordWeldone from "../../../components/templates/auth/password/reset/ResetPasswordWeldone";

const SetNewPassword = () => {
	const router = useRouter();
	const resetFinished = router.asPath.split("?")[1] === "finish";
	return !resetFinished ? (
		<ResetNewPasswordTemplate />
	) : (
		<ResetPasswordWeldone />
	);
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { token } = ctx.query;
	// check if token exists in the url query
	if (!token)
		return { props: {}, redirect: { destination: "/auth", permanent: true } };
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};

export default SetNewPassword;
