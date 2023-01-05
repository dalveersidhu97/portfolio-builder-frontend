import { gql, useMutation } from "@apollo/client";
import { User } from "../../../types/user.types";
import { MutationOptions } from "../types";

// GQLs
const REGISTER_MUTATION = gql`
mutation CreateUserMutation($user: UserInput) {
    createUser(user: $user) {
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

type RegisterVariables = {
	user: {
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    }
}
export type RegisterResult = { success: boolean, user?: User }
export type RegisterData = { createUser?: RegisterResult }

// Mutations
export const useRegisterMutation = (mutationOptions?: MutationOptions<RegisterData, RegisterVariables>) => {
	const mutation = useMutation<RegisterData, RegisterVariables>(REGISTER_MUTATION, mutationOptions);
	return mutation;
}