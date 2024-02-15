import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordState, setResetPasswordState } from "../../../../redux/reducers/authSlice";
import ActivityIndicator from "../../../../components/ui/atom/loader/ActivityIndicator";

const PasswordResetOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const resetPasswordData = useSelector(resetPasswordState);

	const handleVerifyOtp = (otp: string) => {
		if (otp) {
			dispatch(setResetPasswordState({ email: resetPasswordData?.email as string }));
			// Todo: verify reset password otp
		}
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

	return <OtpTemplate {...{ loading, setLoading }} next={handleVerifyOtp} timeLimit={60} />;
};

export default PasswordResetOtpVerificationPage;
