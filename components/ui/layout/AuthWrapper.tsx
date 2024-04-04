import React, { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie, logoutUser } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/reducers/auth/apiAuthSlice";
import { useRouter } from "next/router";

type AuthWrapperProps = { children?: ReactNode };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const authToken = getCookie(AUTH_TOKEN_KEY);
	const dispatch = useDispatch();
	const router = useRouter();

	const checkAuthValidity = async () => {
		const decodedToken: any = jwt.decode(String(authToken));
		if (!authToken || !decodedToken || decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) {
			logoutUser();
			return;
		} else if (document && document.visibilityState == "hidden") {
			await dispatch(fetchUserProfile() as any);
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

	useEffect(() => {
		(async () => {
			console.log("profile refetched");
			await dispatch(fetchUserProfile() as any);
		})();
	}, [router]);

	return <>{children}</>;
};

export default AuthWrapper;
