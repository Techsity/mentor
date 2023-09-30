import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { ReusableParticles } from "../../../components/templates/auth/forgot-password";
import { PrimaryButton } from "../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../components/ui/atom/loader/ActivityIndicator";
import ResetNewPasswordTemplate from "../../../components/templates/auth/reset-password";

const SetNewPassword = () => {
	return <ResetNewPasswordTemplate />;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { token } = ctx.query;
	// check if token exists in the url query
	if (!token)
		return { props: {}, redirect: { destination: "/", permanent: true } };
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};

export default SetNewPassword;
