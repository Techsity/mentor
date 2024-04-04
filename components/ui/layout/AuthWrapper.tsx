import React, { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie, logoutUser } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/reducers/auth/apiAuthSlice";

type AuthWrapperProps = { children?: ReactNode };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const authToken = getCookie(AUTH_TOKEN_KEY);
	const dispatch = useDispatch();

	const checkAuthValidity = async () => {
		if (document && document.visibilityState == "hidden") await dispatch(fetchUserProfile() as any);
		const decodedToken: any = jwt.decode(String(authToken));
		if (!authToken || !decodedToken || decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) {
			logoutUser();
			return;
		}
	};

	useEffect(() => {
		document.addEventListener("visibilitychange", checkAuthValidity);
		document.addEventListener("cookiechange", checkAuthValidity);
		return () => {
			document.removeEventListener("visibilitychange", checkAuthValidity);
			document.removeEventListener("cookiechange", checkAuthValidity);
		};
	}, [authToken]);
	return <>{children}</>;
};

export default AuthWrapper;
