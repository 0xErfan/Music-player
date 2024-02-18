import React, { useEffect, useRef } from 'react'
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
    storageUpdate: false,
    currentSong: null,
    musicMetadata: { currentTime: null, duration: null },
    toastData: { text: "", status: 1 },
    userData: null,
    userSongsStorage: []
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
        case "storageManage": {
            return { ...state, userSongsStorage: action.payload }
        }
        case "changeCurrent": {
            return { ...state, songIndex: action.payload, isPlaying: true }
        }
        case "changeMetadata": {
            return { ...state, musicMetadata: action.payload }
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

    state.like = async () => {

        if (mainUserData.songs.length) {
            try {

                let updatedData = [...mainUserData.songs]
                updatedData.some(song => {
                    if (song.name == state.currentSong.name) {
                        song.liked = !song.liked
                        return true
                    }
                })

                const { data, error } = await supabase.auth.updateUser({
                    data: { songs: updatedData }
                })
                console.log(data);
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

    state.setCurrentTime = time => {
        audio.current.currentTime = time
        dispatch({ type: "play" })
    }

    let audio = useRef(new Audio());

    const fetchMusic = async () => {
        if (state.userData && state.currentSong) {
            const musicUrl = `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/users/${getUserInfo().user.email}/${state.currentSong.name}`
            audio.current.src = musicUrl
        }
    }

    useEffect(() => { fetchMusic() }, [state.currentSong])

    useEffect(() => {
        let timer, ignore = true;
        if (state.isPlaying && ignore) {
            audio.current.play()

            timer = setInterval(() => {
                dispatch({
                    type: "changeMetadata", payload: {
                        ...state.musicMetadata,
                        currentTime: Math.trunc(audio.current.currentTime),
                        duration: Math.trunc(audio.current.duration)
                    }
                })
            }, 1000)
        } else audio.current.pause()

        return (() => { clearInterval(timer), ignore = false })
    }, [state.currentSong, state.isPlaying, state.musicMetadata])

    let userMetadata = state.userData && state.userData[0].user.user_metadata
    if (userMetadata || state.userSongsStorage) {
        mainUserData = userMetadata
        state.currentSong = state.userSongsStorage[state.songIndex]
    }

    async function fetchData() {
        const { data, error } = await supabase.storage.from("users").list(getUserInfo().user.email)

        if (data) dispatch({ type: "storageManage", payload: data })
        if (error) {
            dispatch({
                type: "toastOn",
                text: "Check your internet connection!",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 3000);
        }
    }

    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = isLogin()
            dispatch({ type: "logCheck", payload: isLogin() })
            if (isLoggedIn) {
                dispatch({ type: "fetchData", payload: getUserInfo() })
                fetchData()
            }
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