import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin } from '../../utils';

const initialStates = {
    isPlaying: 0,
    showToast: 0,
    isLogin: 0,
    toastData: { text: "", status: 1 },
    allSongs: [],
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
    }, [])

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}