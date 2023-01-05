import { FC, useRef } from "react";
import { CgUser } from "react-icons/cg";
import { useUpdateUser } from "../../apolloClient/mutations/user";
import { useMobileContext } from "../../store";
import { useUserContext } from "../../store/context/UserProvider";
import { useOnClickOutside } from "../../utils/hooks/useOnOutsideClick";
import { FaGithubSquare, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdLocationPin, MdPhone, MdDownloadForOffline } from 'react-icons/md';
import { Editable, InputComponent, InputDialog } from "../Editable";
import { IoCloseSharp } from "react-icons/io5";

export const SideNav: FC = () => {
    const { leftBarVisible, setLeftBarVisible } = useMobileContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const { user, isMe } = useUserContext();
	useOnClickOutside(containerRef, () => leftBarVisible && !isMe && setLeftBarVisible(false));
	const cssClass = leftBarVisible ? 'left-0 transition-all-medium' : '-left-full transition-all-medium';
    const buttonClass = 'bg-primary-light-2 p-1 w-full text-center rounded-full';


    return (<>
        {leftBarVisible && <div onClick={(e)=>e.preventDefault()} className="md:hidden absolute top-0 left-0 w-screen h-screen z-10 bg-[#0000009f] animate-opacity"></div>}
        <div 
            ref={containerRef}
            data-testid='SideNav' 
            className={"text-sm md:text-base flex bg-primary-light z-10 flex-col gap-4 p-6 h-full max-w-full md:rounded-xl md:static fixed top-0 shadow-light tracking-normal "+cssClass}
        >
            <div className="flex flex-col gap-3 items-center w-full bg-inherit">
                {leftBarVisible && <button onClick={()=>setLeftBarVisible(false)} className="md:hidden absolute top-0 right-0 p-4 text-primary hover:opacity-70">
                    <IoCloseSharp size={26} />
                </button>}
                <div className="h-44 w-44 rounded-full overflow-hidden relative text-gray-300">
                    {!!user?.picture && <img className="w-full h-full object-cover" src={user?.picture} alt="Profile image"></img>}
                    {!user?.picture && <CgUser className="w-full h-full p-8 border border-gray-400 text-gray-400 rounded-full"></CgUser>}
                    <Editable 
                        label="Update Profile Image"
                        size={20}
                        InputComponent={InputDialog} 
                        inputComponentProps={{
                            placeholder:"Image URL",
                            value: user?.picture, 
                            useUpdate: useUpdateUser,
                            makeVariables: (picture) => ({user: { picture }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.picture })
                         }}
                    />
                </div>
                <h2 title="Name" className="font-semibold text-xl md:text-2xl flex items-center gap-2 bg-inherit relative min-w-max">
                    {user?.name} {isMe? <span className="text-xs text-gray-400 bg-inherit">(You)</span>: ''}
                    <Editable 
                        rounded="rounded-md"
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Your full name",
                            value: user?.name, 
                            useUpdate: useUpdateUser,
                            makeVariables: (name) => ({user: { name }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.name })
                         }}
                    />
                </h2>
                {(!!user?.about || isMe) && <p title="Role" className={buttonClass+' relative '}>
                    {!!user?.about ? user.about : isMe ? 'Add Role' : ''}
                    <Editable 
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Role, Eg: Painter",
                            value: user?.about, 
                            useUpdate: useUpdateUser,
                            makeVariables: (about) => ({user: { about }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.about })
                         }}
                    />
                </p>}
                {(!!user?.resume || isMe) && <a className={buttonClass+" text-primary relative"} href={user?.resume} target="_blank">
                    <span className="flex gap-2 items-center justify-center">
                        <MdDownloadForOffline size={20}></MdDownloadForOffline>
                        {!!user?.resume ? 'Download Resume' : isMe ? 'Add Resume' : ''}
                    </span>
                    <Editable 
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Resume link, Eg: https://example.com/resume.pdf",
                            value: user?.resume, 
                            useUpdate: useUpdateUser,
                            makeVariables: (resume) => ({user: { resume }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.resume })
                         }}
                    />
                </a>}
            </div>
            <div className="flex flex-col gap-2 bg-primary-light-2 py-3 px-4 w-full rounded-lg text-primary">
                <a href="mailto:dalveersidhu97@gmail.com" title="Email address" className=" relative bg-inherit">
                    <span className="flex gap-2 items-center">
                        <MdEmail size={20} className="flex-shrink-0"></MdEmail>
                        {user?.email}
                    </span>
                    <Editable 
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Email address",
                            value: user?.email, 
                            useUpdate: useUpdateUser,
                            makeVariables: (email) => ({user: { email }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.email })
                         }}
                    />
                </a>
                {(!!user?.phone || isMe) && <a href="tel:+19029880900" title="Phone number" className=" relative bg-inherit">
                    <span className="flex gap-2 items-center">
                        <MdPhone size={20}  className="flex-shrink-0"></MdPhone>
                        {!!user?.phone ? user?.phone : isMe ? 'Add Phone' : ''}
                    </span>
                    <Editable 
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Phone number",
                            value: user?.phone, 
                            useUpdate: useUpdateUser,
                            makeVariables: (phone) => ({user: { phone }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.phone })
                         }}
                    />
                </a>}
                {(!!user?.address || isMe) && <address title="Address" className=" relative bg-inherit">
                    <span className="flex gap-2 items-center">
                        <MdLocationPin size={20}  className="flex-shrink-0"></MdLocationPin>
                        {!!user?.address ? user?.address : isMe ? 'Add Address' : ''}
                    </span>
                    <Editable 
                        InputComponent={InputComponent} 
                        inputComponentProps={{
                            placeholder:"Address",
                            value: user?.address, 
                            useUpdate: useUpdateUser,
                            makeVariables: (address) => ({user: { address }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.address })
                         }}
                    />
                </address>}
            </div>
            <div className="flex justify-between mt-auto w-full text-primary gap-4 bg-inherit">
                {(!!user?.linkedin || isMe) && <a href={user?.linkedin} target="_blank" className="bg-inherit relative">
                    <span className="flex flex-col gap-1 items-center text-xs md:text-sm px-2">
                        <FaLinkedin size={28}></FaLinkedin>
                        {!!user?.linkedin ? 'LinkedIn' : isMe ? 'Add' : ''}
                    </span>
                    <Editable 
                        label="Update LinkedIn URL"
                        rounded="rounded-md"
                        InputComponent={InputDialog} 
                        inputComponentProps={{
                            placeholder:"LinkedIn URL",
                            value: user?.linkedin, 
                            useUpdate: useUpdateUser,
                            makeVariables: (linkedin) => ({user: { linkedin }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.linkedin })
                         }}
                    />
                </a>}
                {(!!user?.github || isMe) && <a href={user?.github} target="_blank" className="bg-inherit relative">
                    <span className="flex flex-col gap-1 items-center text-xs md:text-sm px-2">
                        <FaGithubSquare size={28}></FaGithubSquare>
                        {!!user?.github ? 'Github' : isMe ? 'Add' : ''}
                    </span>
                    <Editable 
                        label="Update Github URL"
                        rounded="rounded-md"
                        InputComponent={InputDialog} 
                        inputComponentProps={{
                            placeholder:"Github URL",
                            value: user?.github, 
                            useUpdate: useUpdateUser,
                            makeVariables: (github) => ({user: { github }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.github })
                         }}
                    />
                </a>}
                {(!!user?.facebook || isMe) && <a href={user?.facebook} target="_blank" className="bg-inherit relative">
                    <span className="flex flex-col gap-1 items-center text-xs md:text-sm px-2">
                        <FaFacebook size={28}></FaFacebook>
                        {!!user?.facebook ? 'Facebook' : isMe ? 'Add' : ''}
                    </span>
                    <Editable 
                        label="Update Facebook URL"
                        rounded="rounded-md"
                        InputComponent={InputDialog} 
                        inputComponentProps={{
                            placeholder:"Facebook URL",
                            value: user?.facebook, 
                            useUpdate: useUpdateUser,
                            makeVariables: (facebook) => ({user: { facebook }}),
                            decideSuccess: (data) => ({ isSuccess: !!data.updateUser?.success, newValue: data.updateUser?.user?.facebook })
                         }}
                    />
                </a>}
            </div>
        </div>
    </>);
} 