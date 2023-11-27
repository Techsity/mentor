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
import { IUser } from "../../interfaces/user.interface";
import ResponseMessages from "../../constants/response-codes";

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
				const userData: IUser = response.data.loginUser.user;
				const authToken = response.data.loginUser.access_token;
				if (response.data.loginUser.user) {
					console.log(userData);
					// toast.success("Login successful");
					// sessionStorage.setItem(
					// 	"authToken",
					// authToken
					// );
					localStorage.setItem("authToken", authToken);
					// setLoading(false);
					dispatch(
						setCredentials({
							isLoggedIn: true,
							user: {
								...userData,
								// Temporary
								payment_cards: [
									{
										bank: { name: "GTbank via Paystack" },
										card_name: "John Doe Ipsum",
										card_number: "5399 8878 9887 99099",
									},
								],
								mentor: true,
								//
							},
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
			.catch((error: any) => {
				console.error(error);
				setLoading(false);
				const resCode: keyof typeof ResponseMessages =
					error.message.split(" -")[0];
				const errorMessage = ResponseMessages[resCode];
				if (errorMessage)
					toast.error(
						errorMessage,
						ToastDefaultOptions({ id: "auth_form_pop" }),
					);
				else {
					toast.error(
						" An error occured. Please try again later.",
						ToastDefaultOptions({ id: "auth_form_pop" }),
					);
				}
			});
	};
	return { loading, handleSubmit, currentState: state, error, handleChange };
};
export default useLoginForm;
