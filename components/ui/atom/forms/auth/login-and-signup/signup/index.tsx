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
		errors,
		handleChange,
		handleSubmit,
		loading,
		throwError,
		values,
		setValues,
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
				setValues={setValues}
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
