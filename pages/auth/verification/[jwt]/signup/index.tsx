import React from "react";
import { GetServerSidePropsContext } from "next";
import OtpTemplate from "../../../../../components/templates/auth/verification/OtpTemplate";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../../../../../services/graphql/mutations/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { formatGqlError } from "../../../../../utils/auth";

const SignupOtpVerificationPage = () => {
	const router = useRouter();
	const token = "toendjsdhjkjckenwd";
	const [verifyUser] = useMutation<{ otp: string }, { otp: string }>(
		VERIFY_USER,
	);

	const handleVerifyOtp = (otp: string) => {
		console.log(otp);

		verifyUser({ variables: { otp } })
			.then((response: any) => {
				console.log(response);
				// router.replace(`/onboarding/interests`, `/onboarding?${token}`);
			})
			.catch((error: any) => {
				console.error(error);
				const errorMessage = formatGqlError(error);
				toast.error(
					errorMessage,
					ToastDefaultOptions({ id: "auth_form_pop" }),
				);
			});
	};

	return <OtpTemplate next={handleVerifyOtp} timeLimit={60} />;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { jwt } = ctx.query;
	// check if jwt exists in the url query
	if (!jwt)
		return {
			props: {},
			redirect: { destination: "/auth", permanent: true },
		};
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};

export default SignupOtpVerificationPage;
