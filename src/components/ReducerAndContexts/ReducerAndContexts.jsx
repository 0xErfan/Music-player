import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin, getUserInfo } from '../../utils';

const initialStates = {
    isPlaying: 0,
    showToast: 0,
    isLogin: false,
    updater: false,
    currentSong: null,
    toastData: { text: "", status: 1 },
    userData: null,
}
export const StateDispatcher = createContext(null);
export const States = createContext(null);
export let mainUserData;

function stateReducer(state, action) {
    switch (action.type) {
        case "pause": {
            return { ...state, isPlaying: 0 };
        }
        case "play": {
            return { ...state, isPlaying: 1 }
        }
        case "newTrack": {
            return {
                ...state,
                showToast: 1,
                toastData: { ...state.toastData, text: action.text, status: action.status }
            }
        }
        case "toastOn": {
            return {
                ...state,
                showToast: 1,
                toastData: { ...state.toastData, text: action.text, status: action.status }
            }
        }
        case "toastOff": {
            return { ...state, showToast: 0 }
        }
        case "logCheck": {
            return { ...state, isLogin: action.payload }
        }
        case "updater": {
            return { ...state, updater: !state.updater }
        }
        case "fetchData": {
            return { ...state, userData: [action.payload] }
        }
        case "changeCurrent": {
            return { ...state, currentSong: [action.payload] }
        }
        default: {
            throw new Error("invalid action type!")
        }
    }
}

export default function MainProvider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialStates)

    let userMetadata = state.userData && state.userData[0].user.user_metadata
    if (userMetadata) {
        mainUserData = userMetadata
        state.currentSong = userMetadata.songs[0]
    }
    
    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = isLogin()
            dispatch({ type: "logCheck", payload: isLogin() })
            if (isLoggedIn) dispatch({ type: "fetchData", payload: getUserInfo() })
        }
        checkLoginStatus();
    }, [state.updater])

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}