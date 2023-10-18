import React from "react";
import LoginAndAuthPageTemplate from "../../components/templates/auth/login-and-signup";
import { useSelector } from "react-redux";
import {
	isLoggedIn,
	currentUser,
} from "../../redux/reducers/features/authSlice";
import { useRouter } from "next/router";

const AuthPage = () => {
	const router = useRouter();
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);
	if (auth || user) {
		router.replace("/dashboard");
		return <div className="min-h-screen"></div>;
	}

	return <LoginAndAuthPageTemplate />;
};

export default AuthPage;
