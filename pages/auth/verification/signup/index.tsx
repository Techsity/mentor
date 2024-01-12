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
	verifyUser: { message: keyof typeof ResponseMessages };
};

const SignupOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const [verifyUser] = useMutation<any, { otp: string }>(VERIFY_USER);

	const handleVerifyOtp = (otp: string) => {
		verifyUser({ variables: { otp } })
			.then((response) => {
				console.log(response);
				setLoading(false);
				// 7
				if (response.data.verifyUser.message === ResponseMessages.USER_VERIFIED) {
					toast.success(ResponseMessages.USER_VERIFIED, ToastDefaultOptions({ id: "success" }));
					router.replace(`/onboarding/interests`);
				}
			})
			.catch((error: any) => {
				setLoading(false);
				console.error(error);
				const errorMessage = formatGqlError(error);
				// Check if account has already been verified
				if (errorMessage === ResponseMessages["statusCode: 13404"]) {
					setTimeout(function () {
						router.replace("/auth?login");
					}, 2000);
				}
				toast.error(errorMessage, ToastDefaultOptions({ id: "auth_form_pop" }));
			});
	};

	return <OtpTemplate {...{ loading, setLoading }} next={handleVerifyOtp} timeLimit={60} />;
};

export default SignupOtpVerificationPage;
