import { FC, PropsWithChildren } from "react";
import { Portal } from "../../portals";

export const Modal: FC<PropsWithChildren< { className?: string } >> = ({ children, className }) => {
    return (
        <Portal>
            <div className={"absolute top-0 left-0 w-full h-full max-w-full max-h-full overflow-auto z-50 flex items-center justify-center animate-opacity-slide-down"}>
                <div className={"h-full w-full overflow-auto py-10 px-4 "+className}>
                    {children}
                </div>
            </div>
            <div className="bg-[#0000007e] w-screen h-screen z-40 absolute top-0 left-0 animate-opacity"></div>
        </Portal>
    );
}