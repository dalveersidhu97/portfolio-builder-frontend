import { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer, useState } from "react";

const MobileContext = createContext({
  leftBarVisible: false,
  rightBarVisible: false,
  setLeftBarVisible: (isVisible: boolean) => undefined as any | void,
  setRightBarVisible: (isVisible: boolean) => undefined as any | void,
});

export const MobileProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [leftBarVisible, setLeftBarVisible] = useState(false);
	const [rightBarVisible, setRightBarVisible] = useState(false);
	const value = {
		leftBarVisible,
		rightBarVisible,
		setLeftBarVisible,
		setRightBarVisible
	}
  return <MobileContext.Provider value={value}>{ children }</MobileContext.Provider>;
};

export const useMobileContext = () => useContext(MobileContext);
