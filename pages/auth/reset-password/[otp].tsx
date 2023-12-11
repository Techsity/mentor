import { GetServerSidePropsContext } from "next";
import React from "react";
import ResetNewPasswordTemplate from "../../../components/templates/auth/password/reset";
import { useRouter } from "next/router";
import ResetPasswordWeldone from "../../../components/templates/auth/password/reset/ResetPasswordWeldone";
import store from "../../../redux/store";

const SetNewPassword = () => {
	const router = useRouter();
	const resetFinished = Object.keys(router.query).find((key) => key === "finish");
	console.log(resetFinished);
	return !resetFinished ? <ResetNewPasswordTemplate /> : <ResetPasswordWeldone />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { otp } = ctx.query;
	if (!otp) return { notFound: true };
	return { props: {} };
};

export default SetNewPassword;
