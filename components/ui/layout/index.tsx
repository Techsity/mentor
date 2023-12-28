import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AuthNavbar from "./navbar/AuthNavbar";
import { useSelector } from "react-redux";
import { currentUser, isLoggedIn } from "../../../redux/reducers/authSlice";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);

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
