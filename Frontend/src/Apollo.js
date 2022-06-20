import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

export const API_URI = "http://localhost:3000/graphql";

const httpLink = createHttpLink({
    uri: API_URI,
});

const authLink = setContext((_, { headers }) => {
    
    const token = sessionStorage.getItem("token");
    console.log(token)
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => toast.error(message));
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const additiveLink = from([authLink, httpLink, errorLink]);

export const client = new ApolloClient({
    link: additiveLink,
    cache: new InMemoryCache(),
});
