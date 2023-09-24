import "animate.css";
import "animate.css/animate.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PagePreLoader from "../components/ui/atom/loader/PagePreLoader";
import LayoutContainer from "../components/ui/layout";
import "../public/styles/globals.css";
import "../public/styles/nprogress.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [initialLoad, setInitialLoad] = useState<boolean>(true);
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
		setTimeout(() => {
			setInitialLoad(false);
		}, 3000);
		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);

	return initialLoad ? (
		<PagePreLoader />
	) : (
		<LayoutContainer>
			<Head>
				<title>Mentö</title>
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
