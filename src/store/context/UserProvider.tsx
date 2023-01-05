import { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer, useState } from "react";
import { User } from "../../types/user.types";
import { useLoginContext } from "./LoginProvider";

const UserContext = createContext({
  user: undefined as any as User | undefined,
  isMe: false,
  setUser: (user: User) => undefined as any | void,
});

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const { user: loggedInUser } = useLoginContext();
	const value = {
		user,
    setUser,
    isMe: loggedInUser?.id === user?.id
	}
  return <UserContext.Provider value={value}>{ children }</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
