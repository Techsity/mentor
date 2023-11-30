import React, { createContext, useContext, useState } from "react";

interface IAuthContext {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<IAuthContext>({
	isOpen: false,
	toggleSidebar: () => {},
});

export const SidebarProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleSidebar = () => setIsOpen(!isOpen);
	return (
		<SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};

export function useSidebar() {
	return useContext(SidebarContext);
}
