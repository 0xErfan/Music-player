import { Navigate } from 'react-router-dom'
import { getUserInfo, isLogin } from '../../utils'
import { StateDispatcher, mainUserData } from '../ReducerAndContexts/ReducerAndContexts'
import { useContext, useState } from 'react'

export default function Account() {

    const dispatch = useContext(StateDispatcher)
    const [update, setUpdate] = useState(false)
    console.log(getUserInfo().user.email);

    const logoutHandler = () => {
        localStorage.removeItem("sb-inbskwhewximhtmsxqxi-auth-token")
        dispatch({ type: "updater" })
        dispatch({ type: "changeCurrent", payload: null })
        setUpdate(preve => !preve)
    }

    return (
        <>
            {!isLogin() ? <Navigate replace={true} to="/login" /> : 
                <div className='container ch:break-words mt-4'>
                    <div className='neoM-bg py-2 px-3 mt-3'>Username: {getUserInfo().user.user_metadata.username}</div>
                    <div className='neoM-bg py-2 px-3 mt-3'>Email: {getUserInfo().user.email}</div>
                    <button onClick={logoutHandler} className="bg-primaryOrange mt-12 py-2 block neoM-buttons w-24 font-bold rounded-md cursor-pointer">Log out</button>
                </div>
            }
        </>
    )
}
