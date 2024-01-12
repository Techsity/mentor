import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Progressbar />
			<Navbar />
			<Sidebar />
			<div className="relative">{children}</div>
			<Footer />
		</>
	);
};

export default LayoutContainer;
