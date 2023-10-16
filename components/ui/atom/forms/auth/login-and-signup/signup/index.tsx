import React from "react";
import { PrimaryButton } from "../../../../buttons";
import ActivityIndicator from "../../../../loader/ActivityIndicator";
import { ISignUpState } from "../../../../../../../interfaces/auth.interface";
import useSignUpForm from "../../../../../../../hooks/forms/useSignUpForm";
import SignupFormInputs from "./SignupFormInputs";
import PasswordValidationComponent from "./PasswordValidationComponent";
import { useRouter } from "next/router";

const SignUpForm = () => {
	const router = useRouter();
	const initialValues: ISignUpState = {
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		country: "",
	};
	const handleSignUpFormSubmit = (state: ISignUpState) => {
		console.log(state);
		setTimeout(function () {
			router.push(`/auth/verification/${"jwt_token"}/signup`);
		}, 2000);
	};

	const {
		errors,
		handleChange,
		handleSubmit,
		loading,
		handleError,
		values,
		handleCountrySelect,
	} = useSignUpForm({ initialValues, onSubmit: handleSignUpFormSubmit });

	return (
		<form
			onSubmit={handleSubmit}
			className="animate__animated animate__fadeIn grid gap-3">
			<SignupFormInputs
				errors={errors}
				handleChange={handleChange}
				handleError={handleError}
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
					className="p-3 text-center px-12 w-full lg:w-auto flex justify-center"
				/>
				<div className="flex-grow">
					<PasswordValidationComponent password={values.password} />
				</div>
			</div>
		</form>
	);
};

export default SignUpForm;
