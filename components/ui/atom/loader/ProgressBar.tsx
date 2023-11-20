import { useRouter } from "next/router";
import NProgress from "nprogress";
import React, { useEffect } from "react";

const Progressbar = () => {
	const router = useRouter();

	useEffect(() => {
		const handleStart = () => {
			NProgress.start();
		};
		const handleStop = () => {
			// scrollTo({ top: 0, behavior: "smooth" });
			NProgress.done();
		};
		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);
	return <></>;
};

export default Progressbar;
