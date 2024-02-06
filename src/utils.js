
const isLogin = () =>  {
    const localStorageData = JSON.parse(localStorage.getItem("sb-inbskwhewximhtmsxqxi-auth-token"))
    if (!localStorageData) return false
    return true;
}

const getUserInfo = () => JSON.parse(localStorage.getItem("sb-inbskwhewximhtmsxqxi-auth-token"))

export {
    isLogin,
    getUserInfo
}