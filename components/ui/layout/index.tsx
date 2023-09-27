import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="pt-10 overflow-x-hidden">{children}</div>
			<Footer />
		</>
	);
};

export default LayoutContainer;
