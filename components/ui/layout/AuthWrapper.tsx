import React, { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie, logoutUser } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { useDispatch } from "react-redux";
import { setCredentials, updateUserProfile } from "../../../redux/reducers/authSlice";
import { IUser } from "../../../interfaces/user.interface";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../services/graphql/mutations/auth";

type AuthWrapperProps = { children?: ReactNode };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const dispatch = useDispatch();
	const [fetchUser] = useLazyQuery(GET_USER_PROFILE);

	const checkAuthValidity = async () => {
		const authToken = getCookie(AUTH_TOKEN_KEY);
		const decodedToken: any = jwt.decode(String(authToken));
		if (!decodedToken || decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) logoutUser();
		await fetchUser()
			.then(({ data }) => {
				const user = data?.userProfile as IUser;
				if (user) {
					dispatch(
						updateUserProfile({
							...user,
						}),
					);
				}
			})
			.catch((err) => {
				console.error("Error updating user state", err);
			});
	};

	useEffect(() => {
		document.addEventListener("visibilitychange", checkAuthValidity);
		return () => document.removeEventListener("visibilitychange", checkAuthValidity);
	}, []);

	return <>{children}</>;
};

export default AuthWrapper;
