import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "../../../ui/atom/buttons";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import OTPForm from "../../../ui/atom/forms/auth/OTPForm";

export interface IOTPTemplateProps {
	timeLimit?: number;
	handleSubmit: (e: FormEvent) => void;
}

const OtpTemplate = ({ timeLimit = 60, handleSubmit }: IOTPTemplateProps) => {
	const [countdown, setCountdown] = useState<number>(timeLimit);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const countDownInterval = setInterval(function () {
			if (countdown > 0) {
				setCountdown((prev) => prev - 1);
			}
		}, 1000);
		return () => clearInterval(countDownInterval);
	}, [countdown]);
	const ActionButtons = () => {
		return (
			<div className="sm:flex grid gap-5 mt-5 items-center">
				<PrimaryButton
					onClick={(e) => {
						setLoading(true);
						setTimeout(function () {
							setLoading(!true);
						}, 2000);
					}}
					disabled={loading}
					title={!loading ? "Continue" : ""}
					icon={
						loading ? (
							<div className="flex justify-center">
								<ActivityIndicator />
							</div>
						) : null
					}
					className="px-12 duration-300 p-3 text-center"
				/>
				<div
					className={`flex flex-col items-center sm:items-start font-[300] ${
						countdown > 0 ? "cursor-not-allowed" : ""
					}`}
				>
					<button
						onClick={() => setCountdown(timeLimit)} //handleResendOtp
						className={countdown > 0 ? "cursor-not-allowed" : "font-medium"}
						disabled={countdown > 0}
					>
						Resend OTP {countdown > 0 ? "in" : null}
					</button>
					{countdown >= 1 ? (
						<div className="flex items-center text-[#A3A6A7] gap-1">
							{countdown}
							<span className="text-black">sec.</span>
						</div>
					) : null}
				</div>
			</div>
		);
	};
	return (
		<div className="min-h-[80vh] flex justify-center pt-20 sm:mt-24 relative px-10 md:px-24">
			<form className="" onSubmit={handleSubmit}>
				<h1
					className="text-3xl text-[#00D569] px-5 sm:px-auto"
					style={{ fontFamily: "Days One" }}
				>
					Enter OTP
				</h1>
				<p className="my-5 sm:my-10 px-5 sm:px-auto">
					Enter the One Time Password sent to the mail you provided
				</p>
				<OTPForm isNumberOTP length={6} />
				<div className="px-5 sm:px-auto">
					<ActionButtons />
				</div>
			</form>
		</div>
	);
};

export default OtpTemplate;
