import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_KEY } from "../constants";
import { getCookie } from "./auth";

const client = (authToken?: string) => {
	const httpLink = new HttpLink({
		uri: "/api/graphql",
	});

	const authLink = setContext((_, { headers }) => {
		// const token = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN_KEY);
		const token = authToken ? authToken : typeof window !== "undefined" && (getCookie(AUTH_TOKEN_KEY) as string);

		// If there's no token, return the original headers
		if (!token) {
			return { headers };
		}
		return {
			headers: {
				...headers,
				authorization: `Bearer ${token}`,
			},
		};
	});
	return new ApolloClient({
		cache: new InMemoryCache(),
		// link: errorLink.conat(authLink.concat(httpLink)),
		link: authLink.concat(httpLink),
	});
};

export default client;
