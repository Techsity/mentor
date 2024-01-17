import "animate.css";
import "animate.css/animate.min.css";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutContainer from "../components/ui/layout";
import "../public/styles/globals.css";
import "../public/styles/nprogress.css";
import "react-multi-carousel/lib/styles.css";
import "react-calendar/dist/Calendar.css";
import "../constants/fonts";
import { ThemeProvider } from "../context/theme.context";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apolloClient";
import { SidebarProvider } from "../context/sidebar.context";
import { GET_MENTOR_PROFILE, GET_USER_PROFILE } from "../services/graphql/mutations/auth";
import { IUser } from "../interfaces/user.interface";
import { checkAuthServerSide, formatGqlError, logoutUser } from "../utils/auth";
import AuthWrapper from "../components/templates/auth/AuthWrapper";
import { PersistGate } from "redux-persist/integration/react";
import jwt from "jsonwebtoken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AgoraClientProvider from "../hooks/agora";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const { user, mentorProfile, logout } = pageProps;
	// const [queryClient] = useState<QueryClient>(() => new QueryClient());
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				{/* <QueryClientProvider client={queryClient}>
					{process.env.NEXT_PUBLIC_APP_ENV === "development" && (
						<ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
					)} */}
				<ApolloProvider client={apolloClient()}>
					<AuthWrapper {...{ user, mentorProfile, logout }}>
						<ThemeProvider>
							<Head>
								<title>Mentör: Connect with experienced Mentors</title>
								<link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
								<meta
									name="viewport"
									content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
								/>
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
									{/* <AgoraClientProvider> */}
										<Component {...pageProps} />
									{/* </AgoraClientProvider> */}
								</LayoutContainer>
							</SidebarProvider>
						</ThemeProvider>
					</AuthWrapper>
				</ApolloProvider>
				{/* </QueryClientProvider> */}
			</PersistGate>
		</Provider>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	if (ctx.req) {
		const authToken = checkAuthServerSide(ctx.req) as string;
		const decodedToken: any = jwt.decode(authToken);
		// console.log(decodedToken);
		if (decodedToken)
			if (decodedToken.exp < Date.now() / 1000) {
				console.log("Auth Token has expired");
				// logoutUser();
				return { pageProps: { ...pageProps, logout: true } };
			} else {
				console.log("Auth Token is still valid");
				try {
					const { data } = await apolloClient({ authToken, ssr: true }).query({
						query: GET_USER_PROFILE,
					});

					const user: IUser | null = data?.userProfile || null;
					if (user) {
						const { data: mentorProfile } = await apolloClient({ authToken, ssr: true }).query({
							query: GET_MENTOR_PROFILE,
						});
						if (mentorProfile) return { pageProps: { ...pageProps, user, mentorProfile } };
						return { pageProps: { ...pageProps, user, mentorProfile: null } };
					}
				} catch (error: any) {
					console.error(JSON.stringify(error));
					const errorMessage = formatGqlError(error);
				}
			}
		else {
			console.error("Error decoding auth token");
			// logoutUser();
			return { pageProps: { ...pageProps, logout: true } };
		}
	}
	return { pageProps: { ...pageProps } };
};

export default MyApp;
