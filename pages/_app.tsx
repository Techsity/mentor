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
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import apolloClient from "../utils/apolloClient";
import { SidebarProvider } from "../context/sidebar.context";
import { GET_MENTOR_PROFILE, GET_USER_PROFILE } from "../services/graphql/mutations/auth";
import { IUser } from "../interfaces/user.interface";
import { setCredentials } from "../redux/reducers/features/authSlice";
import { checkAuthServerSide, formatGqlError, logoutUser } from "../utils/auth";
import AuthWrapper from "../components/templates/auth/AuthWrapper";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const { user, mentorProfile } = pageProps;

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<ApolloProvider client={apolloClient()}>
					<AuthWrapper {...{ user, mentorProfile }}>
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
									<Component {...pageProps} />
								</LayoutContainer>
							</SidebarProvider>
						</ThemeProvider>
					</AuthWrapper>
				</ApolloProvider>
			</PersistGate>
		</Provider>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	if (ctx.req) {
		const authToken = checkAuthServerSide(ctx.req) as string;
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
	return { pageProps: { ...pageProps } };
};

export default MyApp;
