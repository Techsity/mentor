import "animate.css";
import "animate.css/animate.min.css";
import { AppProps } from "next/app";
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
import { PersistGate } from "redux-persist/integration/react";
import AuthWrapper from "../components/ui/layout/AuthWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
	// const [queryClient] = useState<QueryClient>(() => new QueryClient());
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				{/* <QueryClientProvider client={queryClient}>
					{process.env.NEXT_PUBLIC_APP_ENV === "development" && (
						<ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
					)} */}
				<ApolloProvider client={apolloClient()}>
					<AuthWrapper>
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
				{/* </QueryClientProvider> */}
			</PersistGate>
		</Provider>
	);
};

// MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
// 	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
// 	if (!ctx.req) {
// 		console.log({ context: ctx.req });
// 		return { pageProps: { ...pageProps } };
// 	}
// 	const authToken = checkAuthServerSide(ctx.req) as string;
// 	const decodedToken: any = jwt.decode(authToken);
// 	if (!decodedToken) {
// 		console.error("Error decoding auth token");
// 		return { pageProps: { ...pageProps, logout: true } };
// 	}
// 	if (decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) {
// 		console.log("Auth Token has expired");
// 		return { pageProps: { ...pageProps, logout: true } };
// 	}
// 	console.log("Auth Token is still valid");
// 	const { data, error } = await apolloClient({ authToken, ssr: true }).query({
// 		query: GET_USER_PROFILE,
// 	});
// 	if (error) {
// 		console.error(JSON.stringify(error));
// 		const errorMessage = formatGqlError(error);
// 		logoutUser();
// 		return { pageProps: { ...pageProps, logout: true } };
// 	}
// 	const user: IUser | null = data?.userProfile || null;
// 	return { pageProps: { ...pageProps, user } };
// };

export default MyApp;
