import React, { ReactNode, useEffect } from "react";
import jwt from "jsonwebtoken";
import { getCookie, logoutUser } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { useDispatch } from "react-redux";
import { updateMentorProfile, updateUserProfile } from "../../../redux/reducers/authSlice";
import { IUser } from "../../../interfaces/user.interface";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../services/graphql/queries/user";
import client from "../../../utils/apolloClient";
import { GET_MENTOR_PROFILE } from "../../../services/graphql/queries/mentor";
import { IMentor } from "../../../interfaces/mentor.interface";

type AuthWrapperProps = { children?: ReactNode };

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const dispatch = useDispatch();
	// const [fetchUser] = useLazyQuery(GET_USER_PROFILE);
	const authToken = getCookie(AUTH_TOKEN_KEY);

	const checkAuthValidity = async () => {
		const decodedToken: any = jwt.decode(String(authToken));
		if (!authToken || !decodedToken || decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) {
			logoutUser();
			return;
		}
		try {
			const fetchUser = client({ authToken }).query;
			const fetchMentorProfile = client({ authToken }).query;
			await fetchUser<{ userProfile: IUser }>({ query: GET_USER_PROFILE })
				.then(async ({ data }) => {
					const user = data?.userProfile;
					if (user) {
						dispatch(
							updateUserProfile({
								...user,
							}),
						);
						// console.log({ user, is_mentor: user.is_mentor });
						if (user.is_mentor) {
							const { data } = await fetchMentorProfile<{ getMentorProfile: IMentor }>({
								query: GET_MENTOR_PROFILE,
							});
							dispatch(
								updateMentorProfile({
									...data.getMentorProfile,
								}),
							);
						}
					}
				})
				.catch((err) => {
					throw err;
				});
		} catch (error) {
			console.error("Error updating user state", error);
		}
	};

	useEffect(() => {
		checkAuthValidity();
		document.addEventListener("visibilitychange", checkAuthValidity);
		return () => document.removeEventListener("visibilitychange", checkAuthValidity);
	}, [authToken]);

	return <>{children}</>;
};

export default AuthWrapper;
