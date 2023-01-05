import { FC, PropsWithChildren } from "react";

export const TitleH2: FC<PropsWithChildren<{className?: string}>> = ({ children, className }) => {
    return <h2 className={"text-xl font-semibold "+className}>
        { children }
    </h2>
}