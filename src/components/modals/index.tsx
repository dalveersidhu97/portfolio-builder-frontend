import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState, useRef } from 'react';
import { useLoginContext } from '../../store';
import { ButtonPrimary, LogginWithGoogle, Modal } from '../common';
import { useRegisterMutation } from '../../apolloClient';
import { useOnClickOutside } from '../../utils/hooks/useOnOutsideClick';

export const LoginModal: FC<{ onHide: () => any }> = ({ onHide }) => {
  const { login, loginMutation: { error }, isLoggedIn } = useLoginContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const modalRef = useRef(null);

  const loginHandler = () => {
    if (!email?.trim() || !password?.trim() ) return;
    login({ email, password });
  }

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(onHide, 1000)
    }
  }, [isLoggedIn])

  useOnClickOutside(modalRef, (e) => {
    onHide();
  });

  return (
    <Modal className='flex items-center justify-center'>
      <div ref={modalRef} className=' bg-white p-10 shadow-2xl rounded-xl flex flex-col gap-6'>
        <h2 className='text-gray-dark text-center font-semibold text-xl'>Login</h2>
        <div className='flex flex-col gap-6'>
          <input onChange={(e) => setEmail(e.target.value)} type={'email'} id='email' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Enter email' />
          <input onChange={(e) => setPassword(e.target.value)} type={'password'} id='password' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Password' />
          <ButtonPrimary onClick={loginHandler}>Login</ButtonPrimary>
          <div className='text-center font-semibold text-gray-light text-sm'>OR</div>
          <LogginWithGoogle />
          {!!error && <p className='text-red-500'>{error.message}</p>}
          {isLoggedIn && <p className='text-green-500 font-semibold text-center'>Login Success!</p>}
        </div>
      </div>
    </Modal>
  );
}

export const RegisterModal: FC<{ onHide: () => any }> = ({ onHide }) => {
  const [register, { loading, data, error }] = useRegisterMutation();
  const { login, isLoggedIn } = useLoginContext();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const registerHandler = () => {
    if (!email || !name || !password || !confirmPassword) return;
    register({ variables: { user: { email, name, password, confirmPassword } } });
  }
  const isRegistered = !loading && !!data?.createUser && data.createUser.success;
  const newUser = data?.createUser?.user!;
  useEffect(() => {
    if (isRegistered) {
      login({ email: newUser.email, password: password! });
    }
  }, [isRegistered])
  useEffect(() => {
    if (isLoggedIn) {
      onHide();
      navigate(`/user/${newUser.id}/about`)
    }
  }, [isLoggedIn])

  useOnClickOutside(modalRef, (e) => {
    onHide();
  });

  return (
    <Modal className='flex justify-center items-start'>
      <div ref={modalRef} className=' bg-white  md:w-[25rem] p-10 shadow-2xl rounded-xl flex flex-col gap-6'>
        <h2 className='text-gray-dark text-center font-semibold text-xl'>Register</h2>
        <div className='flex flex-col gap-6'>
          <input onChange={(e) => setName(e.target.value.trim().toLocaleLowerCase())} type={'name'} id='name' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Enter name' />
          <input onChange={(e) => setEmail(e.target.value.trim())} type={'email'} id='email' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Enter email' />
          <input onChange={(e) => setPassword(e.target.value)} type={'password'} id='password' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Set Password' />
          <input onChange={(e) => setConfirmPassword(e.target.value)} type={'password'} id='confirmPassword' className='px-4 py-2 bg-gray-200 rounded-md' placeholder='Confirm Password' />
          <ButtonPrimary onClick={registerHandler}>Register</ButtonPrimary>
          <div className='text-center font-semibold text-gray-light text-sm'>OR</div>
          <LogginWithGoogle btnText='Signup with Google' />
          {!!error && <p className='text-red-500'>{error.message}</p>}
          {isRegistered && <p className='text-green-500 font-semibold text-center'>Registration Success!</p>}
        </div>
      </div>
    </Modal>
  );
}