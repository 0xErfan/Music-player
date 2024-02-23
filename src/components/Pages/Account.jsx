import { Navigate } from 'react-router-dom'
import { getUserInfo, isLogin } from '../../utils'
import { StateDispatcher, States } from '../ReducerAndContexts'
import { useContext, useState } from 'react'
import { defaultState } from '../ReducerAndContexts'

export default function Account() {

    const dispatch = useContext(StateDispatcher)
    const { stopMusic } = useContext(States)
    const [update, setUpdate] = useState(false)

    const logoutHandler = () => {
        localStorage.removeItem("sb-inbskwhewximhtmsxqxi-auth-token")
        stopMusic()
        dispatch({ type: "updater" })
        dispatch({ type: "reseter", payload: defaultState })
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
