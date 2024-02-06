
const isLogin = () =>  {
    const localStorageData = localStorage.getItem("loginData")
    if (!localStorageData) return false
    return true;
}

export {
    isLogin,
}