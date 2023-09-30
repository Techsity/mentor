import React, { ChangeEvent, FormEvent, useState } from "react";
import { ISignUpState } from "../../interfaces/auth.interface";
import { isValidPhoneNumber } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";

interface IFieldError {
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
	const [error, setError] = useState<IFieldError | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [values, setValues] = React.useState<ISignUpState>(initialValues);

	const throwError =
		(fieldName: keyof ISignUpState) => (e: FormEvent<HTMLInputElement>) => {
            console.log();
            
			if (fieldName === "fullName") {
				toast.error(
					"Please fill all fields",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				setError({ field: "fullName", error: "Please fill all fields" });
			}
			if (fieldName === "email") {
				if (!values.email) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					setError({ field: "email", error: "Please fill all fields" });
					return;
				}
				toast.error(
					"Invalid Email",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				setError({ field: "email", error: "Invalid Email" });
			}
			if (fieldName === "phone") {
				if (!values.phone) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					setError({ field: "phone", error: "Please fill all fields" });
					return;
				}
				toast.error(
					"Invalid Phone Number",
					ToastDefaultOptions({ id: "signup_form_pop" }),
				);
				setError({ field: "phone", error: "Invalid Phone Number" });
			}
			if (fieldName === "password") {
				if (!values.password) {
					toast.error(
						"Please fill all fields",
						ToastDefaultOptions({ id: "signup_form_pop" }),
					);
					setError({ field: "password", error: "Please fill all fields" });
					return;
				}
			}
		};

	const handleChange =
		(name: keyof ISignUpState) => (e?: ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [name]: e?.target.value });
			setError(null);
			toast.dismiss("signup_form_pop");
		};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// if (!isValidPhoneNumber(values.phone.trim())) {
		// 	throwError("phone");
		// 	return;
		// }
		setError(null);
		if (values) {
			setLoading(true);
			setTimeout(function () {
				onSubmit && onSubmit(values);
				setLoading(false);
			}, 3000);
		}
	};
	return {
		error,
		loading,
		values,
		throwError,
		handleChange,
		handleSubmit,
		setValues,
	};
};

export default useSignUpForm;
