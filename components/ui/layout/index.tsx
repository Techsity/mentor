import React, { Fragment, ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Fragment>
			<Progressbar />
			<Navbar />
			<Sidebar />
			<div className="relative">{children}</div>
			<Footer />
		</Fragment>
	);
};

export default LayoutContainer;
