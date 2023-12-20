import { useLazyQuery, useQuery } from "@apollo/client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, switchProfile } from "../../../redux/reducers/features/authSlice";
import { GET_MENTOR_PROFILE, GET_USER_PROFILE } from "../../../services/graphql/mutations/auth";
import { getCookie } from "../../../utils/auth";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { IUser } from "../../../interfaces/user.interface";
import mentors from "../../../data/mentors";
import router from "next/router";
import { IMentor } from "../../../interfaces/mentor.interface";

const AuthWrapper = ({
	children,
	user,
	mentorProfile,
}: {
	children: ReactNode;
	user: IUser | null;
	mentorProfile: IMentor | null;
}) => {
	const dispatch = useDispatch();

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
	}
	return <>{children}</>;
};

export default AuthWrapper;
