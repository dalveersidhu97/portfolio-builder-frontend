import { useEffect, useState } from "react";
import { BiEdit, BiLogInCircle, BiLogOutCircle, BiPlusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUserSearchQuery } from "../../apolloClient";
import { ButtonPrimary, LoginModal, RegisterModal, UserView } from "../../components";
import { useLoginContext } from "../../store";
import { useUserContext } from "../../store/context/UserProvider";
import { User } from "../../types/user.types";

export const LandingPage = () => {
    const { isLoggedIn, refreshLoginMutation: { loading }, logout, user: loggedInUser } = useLoginContext();
    const { user } = useUserContext();
    const [searchInput, setSearchInput] = useState<string>();
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [doSearch, { data, loading: searching, error }] = useUserSearchQuery({ search: searchInput || '' }, {
        onCompleted({ users }) {
            if (!!users) {
                setUsers(users);
            }
        },
        onError(error) { setUsers([]); setErrorMessage(error.message); }
    }, 'lazy');
    const [users, setUsers] = useState<User[]>(loggedInUser ? [loggedInUser] : []);
    const navigate = useNavigate();
    const [visibleModal, setVisibalModal] = useState<'login' | 'signup'>();

    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value.trim());
        if (timeoutId) clearTimeout(timeoutId);
        if (!e.target.value.trim()) {
            setUsers(loggedInUser ? [loggedInUser] : []);
            return;
        }
        const timeOut = setTimeout(() => {
            doSearch({ variables: { search: searchInput || '' } });
        }, 500);
        setTimeoutId(timeOut);
    }

    useEffect(() => {
        if (!searchInput) loggedInUser ? setUsers([loggedInUser]) : doSearch({ variables: { search: 'dalveersidhu97@gmail.com' } });
    }, [isLoggedIn, searchInput])
    useEffect(() => {
        doSearch({ variables: { search: loggedInUser?.email || 'dalveersidhu97@gmail.com' } });
    }, [doSearch, loggedInUser?.email])
    return (
        <div className='w-screen h-screen text-primary-light flex justify-center bg-gray-600 overflow-auto'>
            <div className='max-w-[60rem] w-full h-full flex flex-col items-center gap-10 p-4'>
                <div className='flex flex-col gap-8 w-full items-center'>
                    <input onChange={searchInputHandler} type='search' placeholder='Search portfolio' className='px-6 !py-4 rounded-full w-full shadow-md bg-gray-200 text-gray-dark' />
                    {!loading && <div className='flex gap-4'>
                        {!isLoggedIn && <>
                            <ButtonPrimary onClick={() => setVisibalModal('signup')} className='!rounded-full !py-4 !px-6 min-w-max flex gap-2 items-center hover:opacity-70 transition-all duration-200'>
                                <BiPlusCircle size={24} />
                                <span>Create Portfolio</span>
                            </ButtonPrimary>
                            <ButtonPrimary onClick={() => setVisibalModal('login')} className='!bg-red-600 !rounded-full !py-4 !px-6 min-w-max flex gap-2 items-center hover:opacity-70 transition-all duration-200'>
                                <BiLogInCircle size={24} />
                                <span>Login</span>
                            </ButtonPrimary>
                        </>}
                        {isLoggedIn && <>
                            <ButtonPrimary onClick={() => navigate(`/user/${loggedInUser!.id}/about`)} className='!rounded-full !py-4 !px-6 min-w-max flex gap-2 items-center hover:opacity-70 transition-all duration-200'>
                                <BiEdit size={24} />
                                <span>Your Portfolio</span>
                            </ButtonPrimary>
                            <ButtonPrimary onClick={logout} className='!bg-red-600 !rounded-full !py-4 !px-6 min-w-max flex gap-2 items-center hover:opacity-70 transition-all duration-200'>
                                <BiLogOutCircle size={24} />
                                <span>Logout</span>
                            </ButtonPrimary>
                        </>}
                    </div>}
                </div>
                {searching && <p>Searching...</p>}
                {!searching && users.length === 0 && <p>No Results</p>}
                <div className='flex gap-8 flex-wrap justify-center max-h-full overflow-auto pb-20'>
                    {users.map(user => <UserView key={user.id} user={user!}></UserView>)}
                </div>
            </div>
            {visibleModal === 'login' && <LoginModal onHide={() => setVisibalModal(undefined)}></LoginModal>}
            {visibleModal === 'signup' && <RegisterModal onHide={() => setVisibalModal(undefined)}></RegisterModal>}
        </div>
    );
}
