import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLoginContext, useMobileContext } from "../../store";
import { useOnClickOutside } from "../../utils/hooks/useOnOutsideClick";

const TOP_NAV_ROUTE = [
  { path: "about", lable: "About" },
  { path: "skills", lable: "Skills" },
  { path: "experience", lable: "Experience" },
  { path: "resume", lable: "Resume" },
];

export const TopNav = () => {
  const { rightBarVisible, setRightBarVisible } = useMobileContext();
	const location = useLocation();
  const { isLoggedIn, logout } = useLoginContext();
  const isActive = (path: string) => location.pathname.includes('/'+path);
	const containerRef = useRef<HTMLDivElement>(null);
	// useOnClickOutside(containerRef, (e) => {rightBarVisible && setRightBarVisible(false)});
	const cssClass = rightBarVisible ? 'right-0' : '-right-full';

  return (<>
    {rightBarVisible && <div onClick={(e)=>{e.preventDefault(); setRightBarVisible(false)}} className="md:hidden absolute top-0 left-0 w-screen h-screen z-10 bg-[#0000009f] animate-opacity"></div>}
    <div
			ref={containerRef}
      className={"flex text-primary text-base flex-col justify-center gap-8 shadow-md z-10 px-10 pt-2 fixed top-0 "+cssClass+" transition-all-medium bg-white h-full md:h-auto md:justify-start md:flex-row md:gap-4 md:shadow-none md:px-4 md:static"}
      data-testid="TopNav"
    >
      {TOP_NAV_ROUTE.map((navRoute) => (
        <Link
          onClick={() => setRightBarVisible(false)}
					key={navRoute.path}
          replace
          to={"../"+navRoute.path}
          relative="path"
					title={navRoute.lable}
          className={`px-6 py-1 ${
            isActive(navRoute.path) ? "bg-primary-light rounded-md" : ""
          }`}
        >
          {navRoute.lable}
        </Link>
      ))}
      {isLoggedIn && <button onClick={logout} className="bg-red-500 text-white rounded-lg px-4 py-2 md:px-3 md:py-1.5 self-center text-xs w-full md:w-auto ml-auto hover:opacity-75">Logout</button>}
    </div>
  </>);
};
