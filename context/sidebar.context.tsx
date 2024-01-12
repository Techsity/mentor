import React, { MouseEvent, createContext, useContext, useState } from "react";

interface IAuthContext {
	isOpen: boolean;
	toggleSidebar: (args?: { close?: boolean }) => void;
}

const SidebarContext = createContext<IAuthContext>({
	isOpen: false,
	toggleSidebar: () => () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleSidebar = (args?: { close?: boolean }) => {
		const { close } = args || {};
		if (close) {
			setIsOpen(false);
		} else {
			setIsOpen(!isOpen);
		}
	};
	return <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export function useSidebar() {
	return useContext(SidebarContext);
}
