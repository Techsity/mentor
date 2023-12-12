import "animate.css";
import "animate.css/animate.min.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PagePreLoader from "../components/ui/atom/loader/PagePreLoader";
import LayoutContainer from "../components/ui/layout";
import "../public/styles/globals.css";
import "../public/styles/nprogress.css";
import "react-multi-carousel/lib/styles.css";
import "react-calendar/dist/Calendar.css";
import "../constants/fonts";
import { ThemeProvider } from "../context/theme.context";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apolloClient";
import { SidebarProvider } from "../context/sidebar.context";
import { setCourseCategories } from "../redux/reducers/features/coursesSlice";
import { courseCategories } from "../data/courses";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// const [initialLoad, setInitialLoad] = useState<boolean>(true);
	const fetchCourseCategories = () => {
		// fetch and set course categories
		store.dispatch(setCourseCategories(courseCategories));
	};

	useEffect(() => {
		fetchCourseCategories();

		// document.body.classList.add("overflow-hidden");
		// const timeout = setTimeout(() => {
		// 	document.body.classList.remove("overflow-hidden");
		// 	setInitialLoad(false);
		// }, 4000);
		// return () => {
		// 	clearTimeout(timeout);
		// };
	}, []);

	return (
		<ApolloProvider client={apolloClient()}>
			<Provider store={store}>
				<ThemeProvider>
					<Head>
						<title>Mentör: Connect with experienced Mentors</title>
						<link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
					</Head>
					<SidebarProvider>
						<LayoutContainer>
							<ToastContainer
								limit={1}
								// newestOnTop
								autoClose={5000}
								theme="dark"
								hideProgressBar
								closeOnClick
								draggable
							/>
							{/* {initialLoad && <PagePreLoader />} */}
							<Component {...pageProps} />
						</LayoutContainer>
					</SidebarProvider>
				</ThemeProvider>
			</Provider>
		</ApolloProvider>
	);
};

export default MyApp;
