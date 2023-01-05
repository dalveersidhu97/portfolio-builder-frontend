import React from "react";
import { FC, PropsWithChildren } from "react";

type CardProps = {
    Icon?: JSX.Element | string,
    title: string | JSX.Element,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any
}

export const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(({ children, Icon, title, className, onClick }, ref) => {
    return (
        <div ref={ref} data-testid='Card' onClick={onClick} className={"flex flex-col gap-3 p-4 border rounded-md border-gray-200 w-full "+className}>
            <>{!!Icon && Icon}</>
            <>{!!title && typeof title === 'string' && <h3 className="font-semibold text-lg">{title}</h3>}</>
            <>{!!title && typeof title != 'string' && title}</>
            <>{ children }</>
        </div>
    );
})