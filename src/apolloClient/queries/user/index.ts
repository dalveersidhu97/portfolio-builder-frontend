import { gql, LazyQueryResultTuple, QueryHookOptions, QueryResult, useLazyQuery, useQuery } from "@apollo/client";
import { User } from "../../../types/user.types";

const USER_QUERY = gql`
query UserQuery($emailOrId: ID) {
	user(emailOrId: $emailOrId) {
		...userFields
	}
}
fragment userFields on User {
	id
	name
	email
	about
	phone
	address
	picture
	resume
	linkedin
	facebook
	github
}
`;

const USER_SEARCH_QUERY = gql`
query UsersQuery($search: String) {
	users(search: $search) {
	  ...userFields
	}
}
fragment userFields on User {
	id
	name
	email
	about
	phone
	address
	picture
	resume
	linkedin
	facebook
	github
}
`;

export type UserData = { user?: User }
export type UserVariables = { emailOrId: string };
type IsLazy = 'lazy' | undefined;
type GetQueryType<T, Data, Variables> = T extends 'lazy' ? LazyQueryResultTuple<Data, Variables> : QueryResult<Data, Variables>;

export const useUserQuery = <T extends IsLazy = undefined>(variables: UserVariables, options: QueryHookOptions<UserData, UserVariables> = {}, isLazy?: T) => {
	const useQueryHook = isLazy ? useLazyQuery : useQuery;
	const opts = { variables, ...options };
	const query = useQueryHook<UserData, UserVariables>(USER_QUERY, opts);
	return query as GetQueryType<T, UserData, UserVariables>;
}

type SearchVariables = { search: string };
type UserSearchData = { users?: User[] };

export const useUserSearchQuery = <T extends IsLazy = undefined>(variables: SearchVariables, options: QueryHookOptions<UserSearchData, SearchVariables> = {}, isLazy?: T) => {
	const useQueryHook = isLazy ? useLazyQuery : useQuery;
	const opts = { variables, ...options };
	const query = useQueryHook<UserSearchData, SearchVariables>(USER_SEARCH_QUERY, opts);
	return query as GetQueryType<T, UserSearchData, SearchVariables>;
}