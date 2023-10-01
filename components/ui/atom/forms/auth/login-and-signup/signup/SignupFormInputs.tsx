import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import CustomTextInput from "../../../../inputs";
import { ISignUpState } from "../../../../../../../interfaces/auth.interface";
import { IFieldError } from "../../../../../../../hooks/forms/useSignUpForm";
import countries from "../../../../../../../data/countries";
import CountrySelector from "../../../../inputs/CountrySelector";
import { SelectedCountry } from "../../../../../../../interfaces/country-selector.interface";

const SignupFormInputs = ({
	errors,
	handleChange,
	handleError,
	values,
	handleCountrySelect,
}: {
	values: ISignUpState;
	handleCountrySelect: (country: SelectedCountry | null) => void;
	handleChange: (
		field: keyof ISignUpState,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	handleError: (
		field: keyof ISignUpState,
	) => (e: FormEvent<HTMLInputElement>) => void;
	errors: IFieldError[];
}) => {
	const defaultContainerProps = {
		className: "border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
	};
	const defaultInputProps = {
		required: true,
		className:
			"bg-[#F6F9F8] placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
	};

	return (
		<>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Full name",
					type: "text",
					value: values.fullName,
					onChange: handleChange("fullName"),
					required: true,
					onInvalid: handleError("fullName"),
				}}
				containerProps={{
					...defaultContainerProps,
					className: errors.find((error) => error?.field === "fullName")
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
					onInvalid: handleError("email"),
					title: "Please enter valid email",
				}}
				containerProps={{
					...defaultContainerProps,
					className: errors.find((error) => error?.field === "email")
						? "border border-[red]"
						: "border-[#094B10] border",
				}}
			/>
			<CountrySelector
				selected={
					countries.find((country) => country.label === values.country) || null
				}
				onSelect={handleCountrySelect}
				required
				onInvalidInput={handleError("country")}
				classes={{
					container: errors.find((error) => error?.field === "country")
						? "border border-[red]"
						: "border-[#094B10] border",
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Phone Number",
					type: "tel",
					pattern: "/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/",
					value: values.phone.trim(),
					onChange: handleChange("phone"),
					inputMode: "numeric",
					required: true,
					onInvalid: handleError("phone"),
					title: "Please enter a valid phone number",
				}}
				containerProps={{
					...defaultContainerProps,
					className: errors.find((error) => error?.field === "phone")
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
					required: true,
					onInvalid: handleError("password"),
					onChange: handleChange("password"),
					min: "8",
				}}
				containerProps={{
					...defaultContainerProps,
					className: errors.find((error) => error?.field === "password")
						? "border border-[red]"
						: "border-[#094B10] border",
				}}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Confirm Password",
					type: "password",
					required: true,
					onInvalid: handleError("confirmPassword"),
					onChange: handleChange("confirmPassword"),
				}}
				containerProps={{
					...defaultContainerProps,
					className: errors.find((error) => error?.field === "confirmPassword")
						? "border border-[red]"
						: "border-[#094B10] border",
				}}
			/>
		</>
	);
};

export default SignupFormInputs;
