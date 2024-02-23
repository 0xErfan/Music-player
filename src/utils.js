
const isLogin = () =>  {
    const localStorageData = JSON.parse(localStorage.getItem("sb-inbskwhewximhtmsxqxi-auth-token"))
    if (!localStorageData) return false
    return true;
}

const getUserInfo = () => JSON.parse(localStorage.getItem("sb-inbskwhewximhtmsxqxi-auth-token"))

const padStarter = (val, len = 2) => {
    const newVal = val.toString().padStart(len, "0")
    if (isNaN(newVal)) {
        return "00"
    } else return newVal
}

export {
    isLogin,
    getUserInfo,
    padStarter
}