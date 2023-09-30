import React, { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "../../../buttons";
import CustomTextInput from "../../../inputs";
import ActivityIndicator from "../../../loader/ActivityIndicator";

const LoginForm = () => {
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<div className="animate__animated animate__bounceIn grid gap-4">
			<CustomTextInput
				inputProps={{
					placeholder: "Email",
					type: "email",
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
					placeholder: "Password",
					type: "password",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<div className="sm:flex grid gap-5 justify-between mt-5 items-center">
				<PrimaryButton
					onClick={() => {
						setLoading(true);
						setTimeout(function () {
							setLoading(!true);
						}, 2000);
					}}
					disabled={loading}
					title={!loading ? "Login" : ""}
					icon={
						loading ? (
							<div className="flex justify-center">
								<ActivityIndicator />
							</div>
						) : null
					}
					className="px-10 p-3 rounded text-center"
				/>
				<Link href="/auth/forgot-password">
					<div className="cursor-pointer">
						Forgot Password? <span className="font-semibold">Reset it!</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
