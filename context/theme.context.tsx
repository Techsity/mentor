import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
	theme: "dark" | "light";
	setTheme: Dispatch<SetStateAction<"dark" | "light">>;
}

const ThemeContext = createContext<IAuthContext>({
	theme: "dark",
	setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		const handleThemeChange = (event: any) => {
			const newColorScheme = event.matches ? "dark" : "light";
			setTheme(newColorScheme);
		};
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);
		return () => {
			window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
		};
	}, []);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
	return useContext(ThemeContext);
}
