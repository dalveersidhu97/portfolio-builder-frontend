import { FC, PropsWithChildren } from 'react';
import { Main } from './Main';
import { MobileHeader } from './MobileHeader';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div data-testid='layout' className="font-Montserrat tracking-wide leading-normal h-screen w-screen max-h-screen max-w-screen overflow-hidden flex items-center justify-center text-gray-dark">
      <div className='w-full h-full max-w-full max-h-full md:max-w-[90rem] md:max-h-[50rem] flex gap-6 overflow-hidden md:overflow-visible md:p-8'>
        <SideNav></SideNav>
        <div className='flex flex-col h-full w-full md:rounded-xl overflow-x-hidden md:shadow-light relative'>
          <TopNav />
          <MobileHeader />
          <Main>
            {children}
          </Main>
        </div>
      </div>
    </div>
  );
};
