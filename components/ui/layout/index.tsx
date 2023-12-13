import React, { ReactNode, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AuthNavbar from "./navbar/AuthNavbar";
import { useSelector } from "react-redux";
import { currentUser, isLoggedIn, setCredentials } from "../../../redux/reducers/features/authSlice";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";
import { AUTH_TOKEN_KEY } from "../../../constants";
import { IUser } from "../../../interfaces/user.interface";
import store from "../../../redux/store";
import { GET_USER_PROFILE } from "../../../services/graphql/mutations/auth";
import apolloClient from "../../../utils/apolloClient";
import { getCookie } from "../../../utils/auth";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);

	// const abortController = new AbortController();
	// const fetchUser = async () => {
	// 	try {
	// 		const { signal } = abortController;
	// 		const token = getCookie(AUTH_TOKEN_KEY);
	// 		if (token) {
	// 			const { data } = await apolloClient(token).query({
	// 				query: GET_USER_PROFILE,
	// 			});
	// 			const user: IUser | null = data?.userProfile || null;
	// 			if (!signal.aborted)
	// 				if (user) {
	// 					console.log(user);
	// 					store.dispatch(setCredentials({ isLoggedIn: true, user }));
	// 				}
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!auth || !user) fetchUser();
	// 	return () => abortController.abort();
	// }, []);

	return (
		<>
			<Progressbar />
			{auth && user ? <AuthNavbar /> : <Navbar />}
			<Sidebar />
			<div className="relative">{children}</div>
			<Footer />
		</>
	);
};

export default LayoutContainer;
