import React, { ReactNode } from "react";
import Navbar from "./navbar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<>{children}</>
		</>
	);
};

export default LayoutContainer;
