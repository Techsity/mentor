import React, { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "../../../../buttons";
import CustomTextInput from "../../../../inputs/CustomTextInput";
import ActivityIndicator from "../../../../loader/ActivityIndicator";
import useLoginForm from "../../../../../../../hooks/forms/useLoginForm";
import { EyeOffSharp, EyeSharp } from "react-ionicons";

const LoginForm = () => {
	const { loading, handleSubmit, currentState, handleChange } = useLoginForm();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<form onSubmit={handleSubmit} className="animate__animated animate__fadeIn grid gap-4">
			<CustomTextInput
				disabled={loading}
				value={currentState.email}
				placeholder="Email"
				type="email"
				onChange={handleChange("email")}
				className="bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm"
				containerProps={{
					className: "border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<CustomTextInput
				disabled={loading}
				value={currentState.password}
				placeholder="Password"
				type={!showPassword ? "password" : "text"}
				onChange={handleChange("password")}
				className="bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm"
				containerProps={{
					className: "border border-[#094B10] bg-transparent duration-300 min-h-[45px] relative",
				}}
				rightIcon={
					<div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
						{!showPassword ? <EyeSharp color="#094B10" /> : <EyeOffSharp color="#094B10" />}
					</div>
				}
			/>
			<div className="sm:flex-row flex flex-col gap-5 justify-between items-center">
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
					className="px-10 p-3 text-center flex justify-center sm:w-auto w-full"
				/>
				<Link href="/auth/forgot-password">
					<div className="cursor-pointer">
						Forgot Password? <span className="font-semibold">Reset it!</span>
					</div>
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
