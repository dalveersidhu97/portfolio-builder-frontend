import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../../store";
import { User } from "../../../types/user.types";
import { ButtonPrimary } from "../buttons";

export const UserView: FC<{ user: User }> = ({ user }) => {
    const { user: loggedInUser } = useLoginContext();
    const isMe = user.id === loggedInUser?.id;
    const navigate = useNavigate();
    return (
      <div className='flex flex-col gap-4 items-center justify-center shadow-[0_0_1rem_rgba(0,0,0,.1)] p-8 rounded-xl bg-gray-300 overflow-hidden'>
        {!!user.picture && <img src={user?.picture} className='max-w-[10rem] max-h-[10rem] aspect-square object-cover rounded-full border border-gray-400' />}
        {!!!user.picture && <div className='w-[10rem] h-[10rem] p-8 border border-gray-400 rounded-full text-gray-400'><RiUser3Line className='w-full h-full'></RiUser3Line></div>}
        <h1 className='font-semibold text-xl text-gray-dark truncate max-w-[10rem]'>{user?.name}</h1>
        <ButtonPrimary className='w-full rounded-xl text-sm flex gap-3 items-center justify-center' onClick={()=>navigate(`/user/${user.id}/about`)}>
          {isMe ? <BiEdit size={16}></BiEdit> : <BsEye size={16}></BsEye>}
          {isMe ? 'Your Portfolio': 'View'}
        </ButtonPrimary>
      </div>
    );
  }
  