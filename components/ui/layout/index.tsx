import React, { ReactNode, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AuthNavbar from "./navbar/AuthNavbar";
import { useSelector } from "react-redux";
import {
	currentUser,
	isLoggedIn,
} from "../../../redux/reducers/features/authSlice";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Progressbar from "../atom/loader/Progressbar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);

	return (
		<>
			<Progressbar />
			{auth && user ? <AuthNavbar /> : <Navbar />}
			<div className="relative">{children}</div>
			<Footer />
		</>
	);
};

export default LayoutContainer;
