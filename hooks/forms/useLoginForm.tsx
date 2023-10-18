import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ILoginState } from "../../interfaces/auth.interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { testUser } from "../../data/user";
import { isEmail } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { setCredentials } from "../../redux/reducers/features/authSlice";

const useLoginForm = ({ initialValues }: { initialValues: ILoginState }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<ILoginState>(initialValues);
	const [error, setError] = useState<string[]>([]);
	const dummyUser = testUser("mentee");

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
		try {
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
			//
			setTimeout(function () {
				setLoading(false);
				dispatch(setCredentials({ isLoggedIn: true, user: dummyUser }));
				router.replace(`/dashboard`);
			}, 2000);
		} catch (error: any) {
			console.log(error);

			setLoading(false);
		}
	};
	// useEffect(()=>{
	// 	if
	// },[router])
	return { loading, handleSubmit, currentState: state, error, handleChange };
};

export default useLoginForm;
