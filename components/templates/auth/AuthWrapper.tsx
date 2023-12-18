import { useLazyQuery, useQuery } from "@apollo/client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/reducers/features/authSlice";
import { GET_USER_PROFILE } from "../../../services/graphql/mutations/auth";
import { getCookie } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { IUser } from "../../../interfaces/user.interface";
import mentors from "../../../data/mentors";

const AuthWrapper = ({ children, user }: { children: ReactNode; user: IUser | null }) => {
	const dispatch = useDispatch();

	if (user)
		dispatch(
			setCredentials({
				isLoggedIn: true,
				user: {
					...user,
					payment_cards: [
						{
							bank: { name: "GTbank via Paystack" },
							card_name: "John Doe Ipsum",
							card_number: "5399 8878 9887 99099",
						},
					],
				},
				// Todo: set mentor profile properly from the mentorProfile query
				mentorProfile: user.is_admin ? mentors[0] : null,
			}),
		);

	return <>{children}</>;
};

export default AuthWrapper;
