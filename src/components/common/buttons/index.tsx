import { FC, PropsWithChildren } from "react"
import { BsGoogle } from "react-icons/bs"

export const ButtonPrimary: FC<PropsWithChildren<{ className?: string, onClick?: () => any | void }>> = ({ children, className, onClick }) => {
    return <button className={'px-4 py-2 bg-primary font-medium text-primary-light rounded-md hover:opacity-70 transition-all duration-200 ' + className} onClick={onClick}>
        {children}
    </button>
}

export const LogginWithGoogle = ({ btnText }: { btnText?: string }) => {
    return <a href={`${process.env.REACT_APP_BACK_END_URL}/auth/google`} className='bg-red-500 text-white flex gap-2 items-center font-medium rounded-md px-4 py-2 hover:opacity-70'>
        <BsGoogle size={20}></BsGoogle>
        {btnText || 'Login with Google'}
    </a>
}