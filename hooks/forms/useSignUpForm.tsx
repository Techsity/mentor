import React, { ChangeEvent, FormEvent, useState } from "react";
import { ISignUpState } from "../../interfaces/auth.interface";
import { isValidPhoneNumber, validatePassword } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { SelectedCountry } from "../../interfaces/country-selector.interface";
import { REGISTER_USER } from "../../services/graphql/mutations/auth";
import { useMutation } from "@apollo/client";

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
  const [registerUser, { data }] = useMutation(REGISTER_USER);
  const handleError =
    (fieldName: keyof ISignUpState) => (e?: FormEvent<HTMLInputElement>) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!errors.find((error) => error.field === fieldName)) {
        setErrors([...errors, { field: fieldName, error: "Error" }]);
      }
      if (fieldName === "fullName") {
        toast.error(
          "Full name is required",
          ToastDefaultOptions({ id: "auth_form_pop" }),
        );
      }
      if (fieldName === "email") {
        if (!values.email) {
          toast.error(
            "Email is required",
            ToastDefaultOptions({ id: "auth_form_pop" }),
          );
          return;
        }
        toast.error(
          "Invalid Email",
          ToastDefaultOptions({ id: "auth_form_pop" }),
        );
      }
      if (fieldName === "phone") {
        if (!values.phone) {
          toast.error(
            "Phone number is required",
            ToastDefaultOptions({ id: "auth_form_pop" }),
          );
          return;
        }
        if (!isValidPhoneNumber(values.phone))
          toast.error(
            "Invalid Phone Number",
            ToastDefaultOptions({ id: "auth_form_pop" }),
          );
      }
      if (fieldName === "password") {
        if (values.password) {
        } else {
          toast.error(
            "Password is required",
            ToastDefaultOptions({ id: "auth_form_pop" }),
          );
          return;
        }
      }
      if (fieldName === "country") {
        if (!values.country) {
          toast.error(
            "Please select your country",
            ToastDefaultOptions({ id: "auth_form_pop" }),
          );
          return;
        }
      }
      if (fieldName === "confirmPassword") {
        if (!values.confirmPassword) {
          toast.error(
            "Please confirm password",
            ToastDefaultOptions({ id: "auth_form_pop" }),
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
      toast.dismiss("auth_form_pop");
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validatePassword(values.password.trim(), "8")) {
      toast.error(
        "Password must not be less than 8-digits",
        ToastDefaultOptions({ id: "auth_form_pop" }),
      );
      return;
    }
    if (!validatePassword(values.password.trim(), "capital")) {
      toast.error(
        "Password must include a capital letter",
        ToastDefaultOptions({ id: "auth_form_pop" }),
      );
      return;
    }
    if (!validatePassword(values.password.trim(), "number")) {
      toast.error(
        "Password must include a number",
        ToastDefaultOptions({ id: "auth_form_pop" }),
      );
      return;
    }
    if (values.password.trim() !== values.confirmPassword.trim()) {
      toast.error(
        "Passwords do not match",
        ToastDefaultOptions({ id: "auth_form_pop" }),
      );
      return;
    }
    setErrors([]);
    if (values) {
		const { fullName, country, phone, email, password } = values;
      registerUser({
        variables: {
          createRegisterInput: {
			name: fullName,
			country,
			phone,
			email,
			password
		  },
        },
      });

      setLoading(true);
      setTimeout(function () {
        onSubmit && onSubmit(values);
        // setLoading(false);
      }, 3000);
    }
  };

  return {
    errors,
    loading,
    values,
    handleError,
    handleChange,
    handleSubmit,
    handleCountrySelect,
  };
};

export default useSignUpForm;
