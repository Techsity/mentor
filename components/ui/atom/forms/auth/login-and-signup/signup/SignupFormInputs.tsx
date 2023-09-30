import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import CustomTextInput from "../../../../inputs";
import { ISignUpState } from "../../../../../../../interfaces/auth.interface";
import { IFieldError } from "../../../../../../../hooks/forms/useSignUpForm";
import countries from "../../../../../../../data/countries";
import CountrySelector from "../../../../inputs/CountrySelector";

const SignupFormInputs = ({
	errors,
	handleChange,
	throwError,
	values,
	setValues,
}: {
	values: ISignUpState;
	setValues: Dispatch<SetStateAction<ISignUpState>>;
	handleChange: (
		field: keyof ISignUpState,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	throwError: (
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
					onInvalid: throwError("fullName"),
				}}
				containerProps={{
					...defaultContainerProps,
					className:
						errors.filter((error) => error?.field === "fullName").length > 0
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
						errors.filter((error) => error?.field === "email").length > 0
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
				required
				onInvalidInput={throwError("country")}
				classes={{
					container:
						errors.filter((error) => error?.field === "country").length > 0
							? "border border-[red]"
							: "border-[#094B10] border",
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
						errors.filter((error) => error?.field === "phone").length > 0
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
						errors.filter((error) => error?.field === "password").length > 0
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
					// className:
					// 	error?.field === "email"
					// 		? "border border-[red]"
					// 		: "border-[#094B10] border",
				}}
			/>
		</>
	);
};

export default SignupFormInputs;
