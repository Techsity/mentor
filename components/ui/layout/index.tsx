import React, { Fragment, ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";
import { ModalProvider } from "../../../context/modal.context";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Fragment>
			<ModalProvider>
				<Progressbar />
				<Sidebar />
				<Navbar />
				<div className="relative">{children}</div>
				<Footer />
			</ModalProvider>
		</Fragment>
	);
};

export default LayoutContainer;
