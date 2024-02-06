import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin } from '../../utils';

const initialStates = {
    isPlaying: 0,
    showToast: 0,
    isLogin: 0,
    updater: false,
    toastData: { text: "", status: 1 },
    userData: null,
}

export const StateDispatcher = createContext(null);
export const States = createContext(null);

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
                allSongs: [...state.allSongs, action.payload],
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
        default: {
            throw new Error("invalid action type!")
        }
    }
}

export default function MainProvider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialStates)

    useEffect(() => {
        dispatch({
            type: "logCheck",
            payload: isLogin(),
        })
    }, [state.updater])

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}