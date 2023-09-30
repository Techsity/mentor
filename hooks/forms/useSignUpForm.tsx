import React, { ChangeEvent, FormEvent, useState } from "react";
import { ISignUpState } from "../../interfaces/auth.interface";
import { isValidPhoneNumber } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";

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
			console.log(errors);
			if (fieldName === "fullName") {
				toast.error(
					"Please fill all fields",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				// setError({ ...error, field: "fullName", error: "Please fill all fields" });
			}
			if (fieldName === "email") {
				if (!values.email) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					// setError({ ...error, field: "email", error: "Please fill all fields" });
					return;
				}
				toast.error(
					"Invalid Email",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				// setError({ ...error, field: "email", error: "Invalid Email" });
			}
			if (fieldName === "phone") {
				if (!values.phone) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					// setError({ ...error, field: "phone", error: "Please fill all fields" });
					return;
				}
				toast.error(
					"Invalid Phone Number",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				// setError({ ...error, field: "phone", error: "Invalid Phone Number" });
			}
			if (fieldName === "password") {
				if (!values.password) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
			}
			if (fieldName === "country") {
				if (!values.country) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					return;
				}
			}
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
		setValues,
	};
};

export default useSignUpForm;
