import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordState, setResetPasswordState } from "../../../../redux/reducers/authSlice";

const PasswordResetOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const resetPasswordData = useSelector(resetPasswordState);

	const handleVerifyOtp = (otp: string) => {
		if (otp) {
			dispatch(setResetPasswordState({ email: resetPasswordData?.email as string, otp }));
			router.replace(`/auth/reset-password/${otp}`);
		}
	};

	return <OtpTemplate {...{ loading, setLoading }} next={handleVerifyOtp} timeLimit={60} />;
};

export default PasswordResetOtpVerificationPage;
