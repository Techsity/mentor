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
import store from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apolloClient";
import { SidebarProvider } from "../context/sidebar.context";
import { GET_USER_PROFILE } from "../services/graphql/mutations/auth";
import { IUser } from "../interfaces/user.interface";
import { setCredentials } from "../redux/reducers/features/authSlice";
import { checkAuthServerSide, formatGqlError } from "../utils/auth";
import AuthWrapper from "../components/templates/auth/AuthWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// const token = getCookie(AUTH_TOKEN_KEY);
	const { user } = pageProps;

	// useEffect(()=>{},[pageProps])

	return (
		<Provider store={store}>
			<ApolloProvider client={apolloClient()}>
				<AuthWrapper user={user}>
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
				</AuthWrapper>
			</ApolloProvider>
		</Provider>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	if (ctx.req) {
		try {
			const authToken = checkAuthServerSide(ctx.req);
			const { data } = await apolloClient(authToken).query({
				query: GET_USER_PROFILE,
			});
			const user: IUser | null = data?.userProfile || null;
			// console.log(user);
			if (user) {
				// store.dispatch(setCredentials({ isLoggedIn: true, user }));
				return { pageProps: { ...pageProps, user } };
			}
		} catch (error) {
			console.error(error);
			const errorMessage = formatGqlError(error);
			// if (errorMessage === "Unauthorized") logoutUser();
		}
	}
	return { pageProps: { ...pageProps } };
};

export default MyApp;
