import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:10005/graphql",
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink), 
});

export default client;