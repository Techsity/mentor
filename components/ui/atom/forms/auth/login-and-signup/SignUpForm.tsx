import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import CustomTextInput from "../../../inputs";
import CountrySelector from "../../../inputs/CountrySelector";
import Link from "next/link";
import { PrimaryButton } from "../../../buttons";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { SelectedCountry } from "../../../../../../interfaces/country-selector.interface";
import { ISignUpState } from "../../../../../../interfaces/auth.interface";
import countries from "../../../../../../data/countries";
import useSignUpForm from "../../../../../../hooks/forms/useSignUpForm";

const SignUpForm = ({
	onSubmit,
}: {
	onSubmit: (state: ISignUpState) => void;
}) => {
	const initialValues: ISignUpState = {
		fullName: "",
		email: "",
		password: "",
		phone: "",
		country: "",
	};
	const {
		error,
		handleChange,
		handleSubmit,
		loading,
		throwError,
		values,
		setValues,
	} = useSignUpForm({ initialValues, onSubmit });

	const defaultContainerProps = {
		className: "border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
	};
	const defaultInputProps = {
		required: true,
		className:
			"bg-[#F6F9F8] placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="animate__animated animate__fadeIn grid gap-3"
		>
			{/* {error.length > 0 ? (
				<span className="text-sm text-[red]">{error[0].error}</span>
			) : null} */}
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Full name",
					type: "text",
					value: values.fullName,
					onChange: handleChange("fullName"),
					required: true,
					onInvalid: throwError("fullName"),
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						error?.field === "fullName"
							? "border border-[red]"
							: "border-[#094B10] border",
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Email",
					type: "email",
					value: values.email,
					onChange: handleChange("email"),
					required: true,
					onInvalid: throwError("email"),
					title: "Please enter valid email",
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						error?.field === "email"
							? "border border-[red]"
							: "border-[#094B10] border",
				}}
			/>
			<CountrySelector
				selected={
					countries.find((country) => country.label === values.country) || null
				}
				onSelect={(country) => {
					if (country) setValues({ ...values, country: country.label });
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Phone Number",
					type: "tel",
					required: true,
					pattern: "/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/",
					value: values.phone.trim(),
					onChange: handleChange("phone"),
					inputMode: "numeric",
					onInvalid: throwError("phone"),
					title: "Please enter a valid phone number",
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						error?.field === "phone"
							? "border border-[red]"
							: "border-[#094B10] border",
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Create Password",
					type: "password",
					value: values.password.trim(),
					onChange: handleChange("password"),
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						error?.field === "password"
							? "border border-[red]"
							: "border-[#094B10] border",
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Confirm Password",
					type: "password",
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						error?.field === "email"
							? "border border-[red]"
							: "border-[#094B10] border",
				}}
			/>
			<div className="sm:flex grid gap-5 justify-between mt-5 items-center">
				<PrimaryButton
					type="submit"
					disabled={loading}
					title={!loading ? "Signup" : ""}
					style={{ fontFamily: "Days One" }}
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
		</form>
	);
};

export default SignUpForm;
