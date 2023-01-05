import { ApolloLink, MutationResult } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { LoginData, LoginResult, RefreshTokenData, useLoginMutation, useLogoutMutation, useRefreshToken } from "../../apolloClient";
import { getAuthLink, httpLink } from "../../apolloClient/links";
import { LoginCredentials } from "../../apolloClient/mutations/types";
import { User } from '../../types/user.types'

const LoginContext = createContext({
	isLoggedIn: false,
	user: null as any as User | undefined,
	setIsLoggedIn: ((isLoggedIn: boolean) => undefined as any) as React.Dispatch<React.SetStateAction<boolean>>,
	loginMutation: undefined as any as MutationResult<LoginData>,
	logoutMutation: undefined as any as MutationResult,
	refreshLoginMutation: undefined as any as MutationResult<RefreshTokenData>,
	login: (credentials: LoginCredentials) => undefined as any | void,
	logout: () => undefined as any | void,
	refreshLogin: () => undefined as any | void
});

export const LoginProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User>();
	const [expiresAt, setExpiresAt] = useState<number|undefined>(undefined);
	const client = useApolloClient();
	const [doLogin, loginMutation] = useLoginMutation({
		onCompleted({ login }, clientOptions) {
			if (login && login.login && login.login.accessToken) {
				setLoggedIn(login);
			}
		},
		onError(error, clientOptions) {
			console.log('LOGIN_ERROR', error);
			logout(true)
		},
	});
	const [doLogout, logoutMutation] = useLogoutMutation();
	const [refreshLogin, refreshLoginMutation] = useRefreshToken({
		onError: (error) => {
			console.log('REFRESH_TOKEN_ERROR', error);
			logout()
		},
		onCompleted({ refereshToken }, clientOptions) {
			if (refereshToken && refereshToken.login && refereshToken.login.accessToken) {
				setLoggedIn(refereshToken)
			}
		},
	});
	
	const setLoggedIn = ({ login, success }: LoginResult) => {
		if (!success || !login) return false
		setIsLoggedIn(true);
		setUser(login.user);
		setExpiresAt(login.expiresAt);
		const authLink = getAuthLink(login.accessToken);
		client.setLink(authLink.concat(client.link));
		return true
	}

	const login = (credentials: LoginCredentials) => {
		doLogin({ variables: { credentials } })
	}
	const logout = (noApiCall?: boolean) => {
		if(noApiCall!==true) doLogout();
		setUser(undefined);
		setIsLoggedIn(false);
		setExpiresAt(undefined);
		client.setLink(httpLink);
	}

	useEffect(() => {
		refreshLogin()
	}, [refreshLogin]);

	// Check each 5 seconds if token is expired and refresh if expired
	useEffect(() => {
		let interval: NodeJS.Timer;
		if(expiresAt !== undefined){
			interval = setInterval(() => {
				const secondsUntilExpired = expiresAt - Date.now() / 1000;
				if (secondsUntilExpired < 30){
					refreshLogin();
					clearInterval(interval);
				}
			}, 5000)
		}
		return () => {
			interval && clearInterval(interval);
		}
	}, [expiresAt, refreshLogin, clearInterval]);

	const value = {
		isLoggedIn,
		setIsLoggedIn,
		login,
		logout,
		refreshLogin,
		loginMutation, 
		logoutMutation,
		refreshLoginMutation,
		user
	}

	if (refreshLoginMutation.loading && !isLoggedIn) return <></>
	return <LoginContext.Provider value={value}>
		{children}
	</LoginContext.Provider>;
};

export const useLoginContext = () => useContext(LoginContext);
