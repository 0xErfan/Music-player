
const isLogin = () =>  {
    const localStorageData = localStorage.getItem("userToken")
    if (!localStorageData) return false
    return true;
}

export {
    isLogin,
}