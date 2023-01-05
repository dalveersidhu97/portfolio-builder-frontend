import { ApolloCache, DefaultContext, MutationHookOptions, MutationTuple, OperationVariables } from "@apollo/client"

export type MutationOptions<TData=any, TVariables=OperationVariables> = MutationHookOptions<TData, TVariables, DefaultContext, ApolloCache<TData>>
export type LoginCredentials = {
  email: string,
  password: string,
}
export type MutationHook<TData, TVariables> = (mutationOptions?: MutationOptions<TData, TVariables>) => MutationTuple<TData, TVariables, DefaultContext, ApolloCache<any>>