import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/reducers/authSlice";
import { checkAuth, getCookie, logoutUser } from "../../../utils/auth";
import { IUser } from "../../../interfaces/user.interface";
import { IMentor } from "../../../interfaces/mentor.interface";
import { useRouter } from "next/router";
import { AUTH_TOKEN_KEY } from "../../../constants";

const AuthWrapper = ({
	children,
	user,
	mentorProfile,
	logout,
}: {
	children: ReactNode;
	user: IUser | null;
	mentorProfile: IMentor | null;
	logout: boolean;
}) => {
	const dispatch = useDispatch();

	// const checkAuthValidity = () => {
	// 	const authToken = checkAuth();
	// 	console.log(authToken);
	// };

	// useEffect(() => {
	// 	window.addEventListener("storage", checkAuthValidity);
	// 	return () => {
	// 		window.removeEventListener("storage", checkAuthValidity);
	// 	};
	// }, []);

	if (user) {
		dispatch(
			setCredentials({
				isLoggedIn: true,
				user: {
					...user,
					is_mentor: mentorProfile ? true : false,
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
	} else if (logout) {
		logoutUser();
	}
	return <>{children}</>;
};

export default AuthWrapper;
