import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AuthNavbar from "./navbar/AuthNavbar";
import { useSelector } from "react-redux";
import { currentUser, isLoggedIn } from "../../../redux/reducers/features/authSlice";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);

	return (
		<>
			{auth && user ? <AuthNavbar /> : <Navbar />}
			{/* <Navbar />  */}
			<div className="pt-10">{children}</div>
			<Footer />
			{/* {children} */}
		</>
	);
};

export default LayoutContainer;
