import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ILoginState } from "../../interfaces/auth.interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { testUser } from "../../data/user";
import { isEmail } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { setCredentials } from "../../redux/reducers/features/authSlice";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../services/graphql/mutations/auth";

const useLoginForm = (props?: { initialValues: ILoginState }) => {
	const router = useRouter();
	const { initialValues } = props || {};
	const initial: ILoginState = {
		email: "",
		password: "",
	};
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<ILoginState>(initialValues || initial);
	const [error, setError] = useState<string[]>([]);

	const [loginUser, { data }] = useMutation(LOGIN_USER);

	const handleChange =
		(field: keyof ILoginState) => (e: ChangeEvent<HTMLInputElement>) => {
			setLoading(false);
			setError([]);
			setState({ ...state, [field]: e.target.value });
		};
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError([]);
		if (!isEmail(state.email)) {
			setLoading(false);
			setError(["email"]);
			toast.error(
				"Please enter a valid email",
				ToastDefaultOptions({ id: "auth_form_pop" }),
			);
			return;
		}
		if (!state.password) {
			setLoading(false);
			setError(["password"]);
			toast.error(
				"Please enter your password",
				ToastDefaultOptions({ id: "auth_form_pop" }),
			);
			return;
		}
		// Perform login api call here
		loginUser({
			variables: {
				createLoginInput: {
					email: state.email,
					password: state.password,
				},
			},
		})
			.then((response: any) => {
				if (response.data.loginUser.user) {
					// toast.success("Login successful");
					localStorage.setItem(
						"authToken",
						response.data.loginUser.access_token,
					);
					// setLoading(false);
					dispatch(
						setCredentials({
							isLoggedIn: true,
							user: response.data.loginUser.user,
						}),
					);
					const next = router.query.next as string;
					if (next) {
						router.replace(decodeURIComponent(next));
					} else {
						router.replace(`/dashboard`);
					}
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error(error);
				if (typeof error === "string")
					toast.error(
						error,
						ToastDefaultOptions({ id: "auth_form_pop" }),
					);
				toast.error(
					" An error occured. Please try again later.",
					ToastDefaultOptions({ id: "auth_form_pop" }),
				);
			});
	};
	return { loading, handleSubmit, currentState: state, error, handleChange };
};
export default useLoginForm;
