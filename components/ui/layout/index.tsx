import React, { ReactNode } from "react";
import Navbar from "./navbar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="pt-10 overflow-x-hidden">{children}</div>
		</>
	);
};

export default LayoutContainer;
