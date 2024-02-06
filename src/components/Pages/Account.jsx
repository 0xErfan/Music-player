import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { States } from '../ReducerAndContexts/ReducerAndContexts'
export default function Account() {

    const { isLogin } = useContext(States)

    return (
        <>
            {!isLogin ? <Navigate replace={true} to="/login" /> : <div>Account</div>}
        </>
    )
}
