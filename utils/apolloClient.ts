import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("authToken");

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

const client = () => {
	// const errorLink = onError(({ graphQLErrors, networkError }) => {
	// 	if (graphQLErrors) {
	// 		graphQLErrors.forEach(({ message, locations, path }) => {
	// 			console.log(
	// 				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
	// 			);
	// 		});
	// 	}
	// 	if (networkError) {
	// 		console.log(`[Network error]: ${networkError}`);
	// 	}
	// });
	return new ApolloClient({
		cache: new InMemoryCache(),
		// link: errorLink.conat(authLink.concat(httpLink)),
		link: authLink.concat(httpLink),
	});
};

export default client;
