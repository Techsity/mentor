import React, { useState } from "react";
import { PrimaryButton } from "../../../ui/atom/buttons";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { ReusableParticles } from "./forgot";
import CustomTextInput from "../../../ui/atom/inputs";

const ResetNewPasswordTemplate = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = () => {
		//
	};
	return (
		<div className="min-h-[80vh] flex justify-center pt-20 sm:mt-24 md:px-24">
			<ReusableParticles />
			<form className="" onSubmit={handleSubmit}>
				<h1
					className="text-3xl text-[#00D569] px-5 sm:px-auto"
					style={{ fontFamily: "Days One" }}
				>
					Now Reset your Password
				</h1>
				<div className="flex gap-5 flex-col justify-start px-5">
					<CustomTextInput
						inputProps={{
							required: true,
							placeholder: "New Password",
							type: "password",
							className:
								"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
						}}
						containerProps={{
							className:
								"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
						}}
					/>
					<CustomTextInput
						inputProps={{
							required: true,
							placeholder: "Confirm New Password",
							type: "password",
							className:
								"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
						}}
						containerProps={{
							className:
								"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
						}}
					/>
				</div>
				<div className="px-5 sm:px-auto">
					<div className="sm:flex grid gap-5 mt-5 items-center">
						<PrimaryButton
							onClick={handleSubmit}
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
						<div className={`flex flex-col items-center sm:items-start font-[300]`}>
							{/* <button
                        onClick={() => setCountdown(timeLimit)} // handleResendOtp
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
                    ) : null} */}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResetNewPasswordTemplate;
