import { ApolloLink, createHttpLink } from "@apollo/client";

console.log('REACT_APP_BACK_END_URL', process.env.REACT_APP_BACK_END_URL)

export const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACK_END_URL,
    credentials: 'include',
    fetchOptions: {
        credentials: 'include',
    }
});

export const getAuthLink = (accessToken: string) => new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({ 
        headers: {
            authorization: accessToken,
            ...headers
        }
    }));
    return forward(operation);
});