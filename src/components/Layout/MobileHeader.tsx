
// TODO: Write Test Cases

import { useMobileContext } from "../../store";
import { RxHamburgerMenu } from 'react-icons/rx';
import { useUserContext } from "../../store/context/UserProvider";
import { CgUser } from "react-icons/cg";

export const MobileHeader = () => {
    const { setLeftBarVisible, setRightBarVisible } = useMobileContext();
    const { user } = useUserContext();
    return (
        <div data-testid='MobileHeader' className="flex md:hidden gap-3 items-center justify-between shadow-light text-white bg-primary">
            <div className="flex gap-3 items-center p-3" onClick={() => setLeftBarVisible(true)}>
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center text-2xl text-white">
                  {!!user?.picture && <img className="w-full h-full object-cover" src={user?.picture} alt="Profile image"></img>}
                  {!user?.picture && <CgUser className="w-full h-full p-2 text-gray-400 rounded-full"></CgUser>}
                </div>
                <div className="flex flex-col gap-[.1rem]">
                    <h1 className="font-semibold" title="Person name">{user?.name}</h1>
                    <div className="text-xs" title="Role">{user?.about}</div>
                </div>
            </div>
            <div className="p-3" onClick={() => setRightBarVisible(true)}><RxHamburgerMenu size={38} style={{ strokeWidth: '.6' }}></RxHamburgerMenu></div>
        </div>
    );
}