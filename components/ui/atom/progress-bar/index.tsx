"use client";

import "animate.css";
import "nprogress/nprogress.css";
import "animate.css/animate.min.css";
import React, { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";

const ClientNProgress = () => {
	const router = useRouter();

	useEffect(() => {
		const handleStart = (url: string) => {
			NProgress.start();
		};
		const handleStop = () => {
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

export default ClientNProgress;
