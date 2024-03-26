import React, { useEffect, useId, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordState, setResetPasswordState } from "../../../../redux/reducers/authSlice";
import ActivityIndicator from "../../../../components/ui/atom/loader/ActivityIndicator";
import { useMutation } from "@apollo/client";
import { REQUEST_OTP } from "../../../../services/graphql/mutations/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";

const PasswordResetOtpVerificationPage = () => {
	const toastId = useId();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const resetPasswordData = useSelector(resetPasswordState);

	const [requestOtp] = useMutation(REQUEST_OTP, {
		variables: {
			email: resetPasswordData?.email,
		},
	});

	const handleVerifyOtp = (otp: string) => {
		if (otp) {
			dispatch(setResetPasswordState({ email: resetPasswordData?.email as string, otp }));
			router.replace(`/auth/reset-password`);
		}
	};

	const handleResendOtp = (done: () => void) => {
		// if (resetPasswordData && resetPasswordData?.email !== "")
		// forgotPassword({ variables: { email: resetPasswordData.email } })
		// 	.then((response) => {
		// 		if (response.data?.forgetPassword.message === ResponseMessages.FORGOT_PASSWORD_EMAIL_SENT) {
		// 			toast.info(
		// 				"An OTP has been sent to the email you provided.",
		// 				ToastDefaultOptions({ id: "info" }),
		// 			);
		// 			router.push(`/auth/verification/reset-password`);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 		const errorMessage = formatGqlError(error);
		// 		toast.error(errorMessage, ToastDefaultOptions({ id: "error" }));
		// 	});
		// else {
		// 	router.push(`/auth/forgot-password`);
		// }
	};

	useEffect(() => {
		if (!resetPasswordData?.email) router.replace(`/auth?login`);
	}, [resetPasswordData, router]);

	if (!resetPasswordData?.email) {
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

export default PasswordResetOtpVerificationPage;
