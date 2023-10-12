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
import "react-multi-carousel/lib/styles.css";
// Fonts
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/poppins/100-italic.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/900-italic.css";
import "@fontsource/days-one";
import { ThemeProvider } from "../context/theme.context";

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

	return (
		<ThemeProvider>
			<Head>
				<title>Mentör</title>
				<link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
				/>
			</Head>
			<LayoutContainer>
				{initialLoad ? (
					<PagePreLoader />
				) : (
					<>
						<ToastContainer />
						<Component {...pageProps} />
					</>
				)}
			</LayoutContainer>
		</ThemeProvider>
	);
};

export default MyApp;
