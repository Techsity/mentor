import React, { ChangeEvent, FormEvent, useState } from "react";
import { ILoginState } from "../../interfaces/auth.interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "../../redux/reducers/authSlice";
import { testUser } from "../../data/user";

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
		setError([]);
		e.preventDefault();
		setLoading(true);
		// Perform api calls here
		setTimeout(function () {
			// setLoading(false);
			// dispatch(setUser(dummyUser));
			// dispatch(setLoggedIn(true));
			// router.replace(`/dashboard`);
		}, 2000);
	};
	return { loading, handleSubmit, currentState: state, error, handleChange };
};

export default useLoginForm;
