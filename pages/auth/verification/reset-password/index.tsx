import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import OtpTemplate from "../../../../components/templates/auth/verification/OtpTemplate";

const PasswordResetOtpVerificationPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const handleVerifyOtp = (otp: string) => {
		if (otp) {
			router.replace(`/auth/reset-password/${otp}`);
		}
	};

	return (
		<OtpTemplate
			{...{ loading, setLoading }}
			next={handleVerifyOtp}
			timeLimit={60}
		/>
	);
};

export default PasswordResetOtpVerificationPage;
