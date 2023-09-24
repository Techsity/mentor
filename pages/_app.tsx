import { AppProps } from "next/app";
import "../public/styles/globals.css";
import "animate.css";
import "../public/styles/nprogress.css";
import "nprogress/nprogress.css";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import LayoutContainer from "../components/ui/layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
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

	return (
		<LayoutContainer>
			<Head>
				<title>Mentor</title>
				<link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
				/>
			</Head>
			<ToastContainer />
			<Component {...pageProps} />
		</LayoutContainer>
	);
};

export default MyApp;
