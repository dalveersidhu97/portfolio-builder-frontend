import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export const Portal:FC<PropsWithChildren> = ({ children }) => {
    const modalRoot = document.getElementById('modal-root')!;
    return ReactDOM.createPortal(children, modalRoot);
}