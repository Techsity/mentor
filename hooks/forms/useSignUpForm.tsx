import React, { ChangeEvent, FormEvent, useState } from "react";
import { ISignUpState } from "../../interfaces/auth.interface";
import { isValidPhoneNumber } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { SelectedCountry } from "../../interfaces/country-selector.interface";

export interface IFieldError {
	field: keyof ISignUpState | "";
	error?: string;
}

const useSignUpForm = ({
	initialValues,
	onSubmit,
}: {
	initialValues: ISignUpState;
	onSubmit?: (state: ISignUpState) => void;
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [values, setValues] = React.useState<ISignUpState>(initialValues);
	const [errors, setErrors] = useState<IFieldError[]>([]);

	const throwError =
		(fieldName: keyof ISignUpState) => (e: FormEvent<HTMLInputElement>) => {
			if (!errors.find((error) => error.field === fieldName)) {
				setErrors([...errors, { field: fieldName, error: "Error" }]);
			}
			if (fieldName === "fullName") {
				toast.error(
					"Full name is required",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
			}
			if (fieldName === "email") {
				if (!values.email) {
					toast.error(
						"Email is required",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
				toast.error(
					"Invalid Email",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
			}
			if (fieldName === "phone") {
				if (!values.phone) {
					toast.error(
						"Phone number is required",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
				if (!isValidPhoneNumber(values.phone))
					toast.error(
						"Invalid Phone Number",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
			}
			if (fieldName === "password") {
				if (!values.password) {
					toast.error(
						"Password is required",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
			}
			if (fieldName === "country") {
				if (!values.country) {
					toast.error(
						"Please select your country",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
			}
			if (fieldName === "confirmPassword") {
				if (!values.confirmPassword) {
					toast.error(
						"Please confirm password",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
				if (values.password !== values.confirmPassword) {
					toast.error(
						"Passwords do not match",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
			}
		};

	const handleCountrySelect = (country: SelectedCountry | null) => {
		if (country) setValues({ ...values, country: country.label });
		setErrors([]);
	};
	const handleChange =
		(name: keyof ISignUpState) => (e?: ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [name]: e?.target.value });
			setErrors([]);
			toast.dismiss("signup_form_pop");
		};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// if (!isValidPhoneNumber(values.phone.trim())) {
		// 	throwError("phone");
		// 	return;
		// }
		setErrors([]);
		if (values) {
			setLoading(true);
			setTimeout(function () {
				onSubmit && onSubmit(values);
				setLoading(false);
			}, 3000);
		}
	};
	return {
		errors,
		loading,
		values,
		throwError,
		handleChange,
		handleSubmit,
		handleCountrySelect,
	};
};

export default useSignUpForm;
