import { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer, useState } from "react";

const  EditableContext = createContext({
  editable: false,
  setEditable: (isEditable: boolean) => undefined as any | void,
});

export const Editable: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [editable, setEditable] = useState(false);
	const value = {
		editable,
		setEditable,
	}
  return <EditableContext.Provider value={value}>{ children }</EditableContext.Provider>;
};

export const useEditable = () => useContext(EditableContext);
