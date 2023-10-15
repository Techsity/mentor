import React, { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "../../../../buttons";
import CustomTextInput from "../../../../inputs/CustomTextInput";
import ActivityIndicator from "../../../../loader/ActivityIndicator";
import useLoginForm from "../../../../../../../hooks/forms/useLoginForm";
import { ILoginState } from "../../../../../../../interfaces/auth.interface";

const LoginForm = () => {
	const initialValues: ILoginState = {
		email: "",
		password: "",
	};
	const { loading, handleSubmit } = useLoginForm();
	return (
		<form
			onSubmit={handleSubmit}
			className="animate__animated animate__fadeIn grid gap-4">
			<CustomTextInput
				placeholder="Email"
				type="email"
				className="bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm"
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<CustomTextInput
				placeholder="Password"
				type="password"
				className="bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm"
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<div className="sm:flex grid gap-5 justify-between mt-5 items-center">
				<PrimaryButton
					type="submit"
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
						Forgot Password?{" "}
						<span className="font-semibold">Reset it!</span>
					</div>
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
