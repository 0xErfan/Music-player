import { Navigate } from 'react-router-dom'
import { isLogin } from '../../utils'
import { StateDispatcher } from '../ReducerAndContexts/ReducerAndContexts'
import { useContext, useState } from 'react'

export default function Account() {

    const dispatch = useContext(StateDispatcher)
    const [update, setUpdate] = useState(false)

    const logoutHandler = () => {
        localStorage.removeItem("sb-inbskwhewximhtmsxqxi-auth-token")
        dispatch({ type: "updater" })
        dispatch({ type: "changeCurrent", payload: null })
        setUpdate(preve => !preve)
    }

    return (
        <>
            {!isLogin() ? <Navigate replace={true} to="/login" /> : <button onClick={logoutHandler} className="bg-primaryOrange py-2 ml-auto m-4 block w-24 font-bold rounded-md cursor-pointer">Log out</button>}
        </>
    )
}
