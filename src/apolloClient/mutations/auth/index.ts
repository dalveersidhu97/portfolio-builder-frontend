import { gql, useMutation } from "@apollo/client";
import { User } from "../../../types/user.types";
import { LoginCredentials, MutationOptions } from "../types";

// GQLs
const LOGIN_MUTATION = gql`
mutation LoginMutation($credentials: LoginInput!) {
  login(credentials: $credentials) {
    success
    ... on LoginResponse {
      login {
        accessToken
        expiresAt
        user {
          ...userFields
        }
      }
    }
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

const LOGOUT_MUTATION = gql`
mutation Logout {
  logout {
    success
  }
}
`;

const REFRESH_TOKEN_MUTATION = gql`
mutation RefreshToken {
  refereshToken {
    success
    ... on LoginResponse {
      login {
        accessToken
        expiresAt
        user {
          ...userFields
        }
      }
    }
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

// Types


type LoginVariables = {
	credentials: LoginCredentials
}
export type LoginResult = { success: boolean, login?: { accessToken: string, expiresAt: number, user: User } }
export type LoginData = { login?: LoginResult }
export type RefreshTokenData = { refereshToken?: LoginResult };

// Mutations
export const useLoginMutation = (mutationOptions?: MutationOptions<LoginData, LoginVariables>) => {
	const mutation = useMutation<LoginData, LoginVariables>(LOGIN_MUTATION, mutationOptions);
	return mutation;
}

export const useLogoutMutation = (mutationOptions?: MutationOptions) => {
  const mutation = useMutation(LOGOUT_MUTATION, mutationOptions)
  return mutation;
}
export const useRefreshToken = (mutationOptions?: MutationOptions<RefreshTokenData>) => {
	const mutation = useMutation<RefreshTokenData>(REFRESH_TOKEN_MUTATION, mutationOptions);
	return mutation;
}


// Exports

export * from './register';