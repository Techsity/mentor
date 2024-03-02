import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_KEY } from "../constants";
import { getCookie } from "./auth";

const client = (args?: { authToken?: string; ssr?: boolean }) => {
	const { authToken, ssr } = args || {};
	const httpLink = new HttpLink({
		uri: ssr ? (process.env.NEXT_PUBLIC_API_BASE_URL as string) : "/api/graphql",
	});

	const authLink = setContext((_, { headers }) => {
		// const token = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN_KEY);
		const token = authToken ? authToken : typeof window !== "undefined" && (getCookie(AUTH_TOKEN_KEY) as string);
		// If there's no token, return the original headers
		if (!token) return { headers, "apollo-require-preflight": "true" };

		return {
			headers: {
				...headers,
				authorization: `Bearer ${token}`,
				"apollo-require-preflight": "true",
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
