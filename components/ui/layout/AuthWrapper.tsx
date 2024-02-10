import React, { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie, logoutUser } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";

type AuthWrapperProps = { children?: ReactNode };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const checkAuthValidity = async () => {
		const authToken = getCookie(AUTH_TOKEN_KEY);
		const decodedToken: any = jwt.decode(String(authToken));
		if (!decodedToken || decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) logoutUser();
	};

	useEffect(() => {
		document.addEventListener("visibilitychange", checkAuthValidity);
		return () => document.removeEventListener("visibilitychange", checkAuthValidity);
	}, []);

	return <>{children}</>;
};

export default AuthWrapper;
