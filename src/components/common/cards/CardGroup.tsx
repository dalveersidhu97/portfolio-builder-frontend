import { FC, PropsWithChildren } from "react";
 
export const CardGroup: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <div className={`flex flex-col md:grid md:grid-cols-2 gap-6 ${className?className:''}`}>
            {children}
        </div>
    );
}