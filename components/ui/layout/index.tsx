import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AuthNavbar from "./navbar/AuthNavbar";
import { checkAuth } from "../../../utils/auth";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{checkAuth() ? <AuthNavbar /> : <Navbar />}
			{/* <Navbar />  */}
			<div className="pt-10">{children}</div>
			<Footer />
			{/* {children} */}
		</>
	);
};

export default LayoutContainer;
