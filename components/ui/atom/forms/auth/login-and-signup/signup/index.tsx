import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import CustomTextInput from "../../../../inputs";
import CountrySelector from "../../../../inputs/CountrySelector";
import Link from "next/link";
import { PrimaryButton } from "../../../../buttons";
import ActivityIndicator from "../../../../loader/ActivityIndicator";
import { SelectedCountry } from "../../../../../../../interfaces/country-selector.interface";
import { ISignUpState } from "../../../../../../../interfaces/auth.interface";
import countries from "../../../../../../../data/countries";
import useSignUpForm from "../../../../../../../hooks/forms/useSignUpForm";
import SignupFormInputs from "./SignupFormInputs";
import PasswordValidationComponent from "./PasswordValidationComponent";

const SignUpForm = ({
	onSubmit,
}: {
	onSubmit: (state: ISignUpState) => void;
}) => {
	const initialValues: ISignUpState = {
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		country: "",
	};
	const {
		errors,
		handleChange,
		handleSubmit,
		loading,
		throwError,
		values,
		handleCountrySelect,
	} = useSignUpForm({ initialValues, onSubmit });

	return (
		<form
			onSubmit={handleSubmit}
			className="animate__animated animate__fadeIn grid gap-3"
		>
			<SignupFormInputs
				errors={errors}
				handleChange={handleChange}
				throwError={throwError}
				values={values}
				handleCountrySelect={handleCountrySelect}
			/>
			<div className="flex lg:flex-row flex-col gap-8 justify-between mt-5 items-center w-full">
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
					className="p-3 text-center px-12 w-full lg:w-auto"
				/>
				<div className="flex-grow">
					<PasswordValidationComponent />
				</div>
			</div>
		</form>
	);
};

export default SignUpForm;
