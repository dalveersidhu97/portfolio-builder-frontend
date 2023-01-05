import { gql, useMutation } from "@apollo/client";
import { User } from "../../../types/user.types";
import { LoginCredentials, MutationOptions } from "../types";

// GQLs
const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($user: UpdateUserInput!) {
  updateUser(updateAttributes: $user) {
    success
    ... on UserResponse {
      user {
        ...userFields
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


type UpdateUserVariables = {
	user: Omit<Partial<User>, 'id'>
}
export type UserResult = { success: boolean, user?: User }
export type UpdateUserData = { updateUser?: UserResult }

export const useUpdateUser = (mutationOptions?: MutationOptions<UpdateUserData, UpdateUserVariables>) => {
	const mutation = useMutation<UpdateUserData, UpdateUserVariables>(UPDATE_USER_MUTATION, mutationOptions);
	return mutation;
}
