import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ILoginState } from "../../interfaces/auth.interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { testUser } from "../../data/user";
import { isEmail } from "../../utils";
import { toast } from "react-toastify";
import { AUTH_TOKEN_KEY, ToastDefaultOptions } from "../../constants";
import { setCredentials } from "../../redux/reducers/authSlice";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_MENTOR_PROFILE, LOGIN_USER } from "../../services/graphql/mutations/auth";
import { IUser } from "../../interfaces/user.interface";
import { authenticate, formatGqlError } from "../../utils/auth";
import ResponseMessages from "../../constants/response-codes";
import mentors from "../../data/mentors";
import { IMentor } from "../../interfaces/mentor.interface";

type ICreateLoginInput = {
	createLoginInput: ILoginState;
};
type LoginResponse = {
	loginUser: { user: IUser & { is_admin: boolean }; access_token: string; is_mentor: boolean };
};

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
	const [loginUser] = useMutation<LoginResponse, ICreateLoginInput>(LOGIN_USER);
	const [getMentorProfile] = useLazyQuery<{ getMentorProfile: IMentor }, any>(GET_MENTOR_PROFILE);

	const handleChange = (field: keyof ILoginState) => (e: ChangeEvent<HTMLInputElement>) => {
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
			toast.error("Please enter a valid email", ToastDefaultOptions({ id: "auth_form_pop" }));
			return;
		}
		if (!state.password) {
			setLoading(false);
			setError(["password"]);
			toast.error("Please enter your password", ToastDefaultOptions({ id: "auth_form_pop" }));
			return;
		}
		// Perform login api call here
		try {
			const response = await loginUser({
				variables: {
					createLoginInput: {
						email: state.email,
						password: state.password,
					},
				},
			});
			if (response.data) {
				const userData: IUser = response.data.loginUser.user;
				const authToken = response.data.loginUser.access_token;
				const is_mentor = response.data.loginUser.is_mentor;
				const is_admin = response.data.loginUser.user.is_admin;
				if (response.data.loginUser.user) {
					// setLoading(false);
					authenticate(authToken, async () => {
						if (is_admin) {
							dispatch(
								setCredentials({
									isLoggedIn: true,
									user: {
										...userData,
										is_mentor: true,
										is_admin: true,
										is_online: true,
									},
								}),
							);
							window.location.href = String(process.env.NEXT_PUBLIC_MENTOR_ADMIN_URL);
						} else if (is_mentor) {
							const { data, loading, error } = await getMentorProfile({
								context: {
									headers: {
										Authorization: `Bearer ${authToken}`,
									},
								},
							});
							if (!loading) {
								if (data?.getMentorProfile) {
									const mentorProfile: IMentor = data.getMentorProfile;
									dispatch(
										setCredentials({
											isLoggedIn: true,
											user: {
												...userData,
												is_mentor: true,
												is_online: true,
												is_admin: false,
												// Temporary
												payment_cards: [
													{
														bank: { name: "GTbank via Paystack" },
														card_name: "John Doe Ipsum",
														card_number: "5399 8878 9887 99099",
													},
												],
											},
											mentorProfile,
										}),
									);
									const next = router.query.next as string;
									if (next) router.replace(decodeURIComponent(next));
									else router.replace(`/profile`);
								}
								if (error) {
									// Todo: Error handling if mentor profile is not found
									setLoading(false);
									console.log("error getting mentor profile: ", error);
								}
							}
						} else {
							dispatch(
								setCredentials({
									isLoggedIn: true,
									user: {
										...userData,
										is_mentor: false,
										is_online: true,
										// Temporary
										payment_cards: [
											{
												bank: { name: "GTbank via Paystack" },
												card_name: "John Doe Ipsum",
												card_number: "5399 8878 9887 99099",
											},
										],
									},
								}),
							);
							const next = router.query.next as string;
							if (next) router.replace(decodeURIComponent(next));
							else router.replace(`/profile`);
						}
					});
				}
			} else {
				setLoading(false);
				console.log({ response: response });
			}
		} catch (error: any) {
			console.error(JSON.stringify(error));
			setLoading(false);
			const errorMessage = formatGqlError(error);
			// If account is not active, redirect to otp screen
			if (errorMessage === ResponseMessages.ACCOUNT_NOT_ACTIVE) {
				toast.error(errorMessage + "\nRedirecting...", ToastDefaultOptions({ id: "auth_form_pop" }));
				setTimeout(function () {
					toast.dismiss("auth_form_pop");
					// Todo: request for otp mutation here, before redirecting
					router.push("/auth/verification/signup");
				}, 2000);
				return;
			}
			toast.error(errorMessage, ToastDefaultOptions({ id: "auth_form_pop" }));
		}
	};
	return { loading, handleSubmit, currentState: state, error, handleChange };
};
export default useLoginForm;
