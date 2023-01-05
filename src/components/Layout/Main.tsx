import { FC, PropsWithChildren } from "react";


export const Main: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className='pb-3 md:pb-4 overflow-y-auto max-h-full h-full' data-testid='MainSection'>
            <div className='py-6 md:py-8 overflow-y-auto w-full h-full px-4 md:px-6'>
                {children}
            </div>
        </div>
    );
}