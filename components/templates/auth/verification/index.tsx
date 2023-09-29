import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "../../../ui/atom/buttons";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";

const OtpTemplate = ({ timeLimit = 60 }: { timeLimit?: number }) => {
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

	return (
		<div className="min-w-[30vw]">
			{/* <div className="">{countdown >= 1 ? countdown : null}</div> */}
			<div className="sm:flex grid gap-5 mt-5 items-center">
				<PrimaryButton
					onClick={() => {
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
				<div className="flex flex-col items-center sm:items-start font-[300]">
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
		</div>
	);
};

export default OtpTemplate;
