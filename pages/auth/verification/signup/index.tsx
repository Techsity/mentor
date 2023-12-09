import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../../../../services/graphql/mutations/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";
import { formatGqlError } from "../../../../utils/auth";
import ResponseMessages from "../../../../constants/response-codes";

type VerifyUserResponseType = {
	data: { verifyUser: { message: keyof typeof ResponseMessages } };
};

const SignupOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const [verifyUser] = useMutation<VerifyUserResponseType, { otp: string }>(
		VERIFY_USER,
	);

	const handleVerifyOtp = (otp: string) => {
		verifyUser({ variables: { otp } })
			.then((response) => {
				console.log(response);
				if (
					response.data?.data.verifyUser.message ===
					ResponseMessages.USER_VERIFIED
				) {
					// toast.success(
					// 	ResponseMessages.USER_VERIFIED,
					// 	ToastDefaultOptions({ id: "success" }),
					// );
					router.replace(`/onboarding/interests`);
				}
			})
			.catch((error: any) => {
				setLoading(false);
				console.error(error);
				const errorMessage = formatGqlError(error);
				if (errorMessage === ResponseMessages["statusCode: 13404"]) {
					setTimeout(function () {
						router.replace("/auth?login");
					}, 2000);
				}
				toast.error(
					errorMessage,
					ToastDefaultOptions({ id: "auth_form_pop" }),
				);
			});
	};

	return (
		<OtpTemplate
			{...{ loading, setLoading }}
			next={handleVerifyOtp}
			timeLimit={60}
		/>
	);
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
