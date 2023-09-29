import React from "react";
import OtpTemplate from "../../../../../components/templates/auth/verification";
import { GetServerSidePropsContext } from "next";
import { Particles } from "../../../../../components/templates/auth";

const PasswordResetOtpVerificationPage = () => {
	return (
		<div className="pt-20 min-h-screen relative lg:px-20 px-6 flex justify-center mt-12">
			<Particles />
			<div className="">
				<h1 className="text-3xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
					Enter OTP
				</h1>
				<p className="my-5 sm:my-10">
					Enter the One Time Password sent to the mail provided earlier
				</p>
				<OtpTemplate />
			</div>
		</div>
	);
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { jwt } = ctx.query;
	// check if jwt exists in the token
	if (!jwt)
		return { props: {}, redirect: { destination: "/", permanent: true } };
	// then check if it matches the one stored in the cookies
	// validate or redirect
	return { props: {} };
};
export default PasswordResetOtpVerificationPage;
