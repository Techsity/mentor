import React, { useEffect, useState } from "react";

const useWindowSize = () => {
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
		return () => window.removeEventListener("resize", () => setWindowWidth(window.innerWidth));
	}, []);
	const isSmallScreen: boolean = windowWidth <= 768;
	const isMediumScreen: boolean = windowWidth >= 768;
	const isLargeScreen: boolean = windowWidth >= 1024;
	const isExtraLargeScreen: boolean = windowWidth >= 1600;
	return { isLargeScreen, isExtraLargeScreen, isMediumScreen, isSmallScreen };
};

export default useWindowSize;
