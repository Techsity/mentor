import React, { useEffect, useState } from "react";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../../../../services/graphql/mutations/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";
import { formatGqlError } from "../../../../utils/auth";
import ResponseMessages from "../../../../constants/response-codes";
import { useSelector } from "react-redux";
import { onboardingUserState } from "../../../../redux/reducers/onboardingSlice";
import ActivityIndicator from "../../../../components/ui/atom/loader/ActivityIndicator";

const SignupOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [verifyUser] = useMutation<any, { otp: string }>(VERIFY_USER);
	const onBoardingUser = useSelector(onboardingUserState);
	// const [requestOtp]= useMutation()

	const handleResendOtp = () => {};

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

	useEffect(() => {
		if (!onBoardingUser) router.replace(`/auth?signup`);
	}, [onBoardingUser, router]);

	if (!onBoardingUser) {
		return (
			<div className="min-h-screen items-center flex justify-center">
				<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
			</div>
		);
	}

	return (
		<OtpTemplate {...{ loading, setLoading, resendOtp: handleResendOtp }} next={handleVerifyOtp} timeLimit={60} />
	);
};

export default SignupOtpVerificationPage;
