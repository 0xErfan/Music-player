import { Navigate } from 'react-router-dom'
import { isLogin } from '../../utils'
export default function Account() {
    return (
        <>
            {!isLogin() ? <Navigate replace={true} to="/login" /> : <div>Account</div>}
        </>
    )
}
