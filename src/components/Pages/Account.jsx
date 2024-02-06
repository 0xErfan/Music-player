import { Navigate } from 'react-router-dom'
import { isLogin } from '../../utils'
export default function Account() {


    const check = isLogin()

    return (
        <>
            {!check ? <Navigate replace={true} to="/login" /> : <div>Account</div>}
        </>
    )
}
