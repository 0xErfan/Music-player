import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin, getUserInfo } from '../../utils';
import { supabase } from '../../client';

const initialStates = {
    isPlaying: 0,
    showToast: 0,
    songIndex: 0,
    isShuffle: false,
    isLogin: false,
    updater: false,
    currentSong: null,
    toastData: { text: "", status: 1 },
    userData: null,
    userSongs: null
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
            return { ...state, songIndex: action.payload, isPlaying: true }
        }
        case "changeShuffle":
            return { ...state, isShuffle: !state.isShuffle }
        default: {
            throw new Error("invalid action type!")
        }
    }
}

export default function MainProvider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialStates)

    state.like = async function songLikeHandler() {

        if (mainUserData.songs.length) {
            try {

                let updatedData = [...mainUserData.songs]

                updatedData.some(song => {
                    if (song.id == state.currentSong.id) {
                        song.liked = !song.liked
                        return true
                    }
                })

                const { data, error } = await supabase.auth.updateUser({
                    data: { songs: updatedData }
                })
                if (error) throw new Error(error)
            } catch (error) {
                dispatch({
                    type: "toastOn",
                    text: "Check your internet connection !",
                    status: 0
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 2000);
                return
            }
            dispatch({ type: "updater" })
        }
    }

    let userMetadata = state.userData && state.userData[0].user.user_metadata
    if (userMetadata) {
        mainUserData = userMetadata
        state.currentSong = userMetadata.songs[state.songIndex]
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