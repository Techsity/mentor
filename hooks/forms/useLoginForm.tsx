import React, { FormEvent, useState } from "react";
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
	const dummyUser = testUser("mentee");
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setLoading(false);
		// Perform api calls here
		setTimeout(function () {
			dispatch(setUser(dummyUser));
			dispatch(setLoggedIn(true));
			router.replace(`/${dummyUser?.role}/dashboard`);
		}, 2000);
	};
	return { loading, handleSubmit };
};

export default useLoginForm;
