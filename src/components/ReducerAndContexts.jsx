import React, { useEffect, useRef } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin, getUserInfo } from '../utils';
import { supabase } from '../client';

export const StateDispatcher = createContext(null);
export const States = createContext(null);
export const defaultState = {
    isPlaying: 0,
    showToast: 0,
    songIndex: 0,
    isShuffle: false,
    shouldRepeat: false,
    shouldIgnore: true,
    musicVolume: 6,
    isLoaded: true,
    isLogin: false,
    updater: false,
    filteredSongsUpdater: false,
    storageUpdate: false,
    storageUpdate: false,
    currentSong: null,
    musicMetadata: { currentTime: null, duration: null },
    toastData: { text: null, status: 0, loader: 0 },
    userData: null,
    userSongsStorage: [],
    share: async url => await navigator.share({ title: "Listen to this music(:", url }).then(data => console.log(data)).catch(err => console.log(err))
}

export let mainUserData;
export let musicUrl;

function stateReducer(state, action) {
    switch (action.type) {
        case "pause": {
            return { ...state, isPlaying: 0 };
        }
        case "play": {
            return { ...state, isPlaying: 1, shouldIgnore: false }
        }
        case "newTrack": {
            return {
                ...state,
                showToast: 1,
                toastData: { ...state.toastData, text: action.text, status: action.status, loader: action.loader }
            }
        }
        case "toastOn": {
            return {
                ...state,
                showToast: 1,
                toastData: { ...state.toastData, text: action.text, status: action.status, loader: action.loader }
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
        case "filteredSongsUpdater": {
            return { ...state, filteredSongsUpdater: !state.filteredSongsUpdater }
        }
        case "fetchData": {
            return { ...state, userData: [action.payload] }
        }
        case "storageManage": {
            return { ...state, userSongsStorage: action.payload }
        }
        case "changeCurrent": {
            return { ...state, songIndex: action.payload, isPlaying: state.shouldIgnore ? 0 : 1 }
        }
        case "changeMetadata": {
            return { ...state, musicMetadata: action.payload }
        }
        case "shouldRepeatChanger": {
            return { ...state, shouldRepeat: action.payload }
        }
        case "shouldIgnoreDisabler": {
            return { ...state, shouldIgnore: false }
        }
        case "volumeChanger": {
            return { ...state, musicVolume: +action.payload }
        }
        case "reseter": {
            return { ...action.payload }
        }
        case "removeLoading": {
            return { ...state, isLoaded: true }
        }
        case "changeShuffle":
            return { ...state, isShuffle: action.payload }
        default: {
            throw new Error("invalid action type!")
        }
    }
}

export default function MainProvider({ children }) {

    const [state, dispatch] = useReducer(stateReducer, {
        isPlaying: 0,
        showToast: 0,
        songIndex: 0,
        isShuffle: false,
        shouldRepeat: false,
        shouldIgnore: true,
        musicVolume: 6,
        isLoaded: false,
        isLogin: false,
        updater: false,
        filteredSongsUpdater: false,
        storageUpdate: false,
        storageUpdate: false,
        currentSong: null,
        musicMetadata: { currentTime: null, duration: null },
        toastData: { text: null, status: 0, loader: 0 },
        userData: null,
        userSongsStorage: [],
        share: async url => await navigator.share({ title: "Listen to this music(:", url }).then(data => console.log(data)).catch(err => console.log(err)),
        stopMusic: () => { audio.current.pause(), audio.current.src = "", audio.current = null }
    })

    let audio = useRef(new Audio());

    state.setMusicVolume = (volume) => { audio.current.volume = volume }

    state.like = async (action, name) => {

        if (mainUserData.songs.length) {
            try {

                let updatedData = [...mainUserData.songs]

                updatedData.some(song => {
                    if (song.name == name) {
                        song[action] = !song[action]
                        return true
                    }
                })

                const { data, error } = await supabase.auth.updateUser({
                    data: { songs: updatedData }
                })
                if (error) throw new Error(error)
                dispatch({ type: "filteredSongsUpdater" })
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

    const fetchMusic = async () => {
        if (state.userData && state.currentSong) {
            musicUrl = `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/users/${getUserInfo().user.email}/${state.currentSong.name}`
            audio.current.src = musicUrl
        }
    }

    useEffect(() => { fetchMusic() }, [state.currentSong?.name])

    useEffect(() => {
        let timer, ignore = true;
        if (state.isPlaying && ignore) {
            !state.shouldIgnore && audio.current.play().catch(err => { })

            timer = setInterval(() => {
                dispatch({
                    type: "changeMetadata", payload: {
                        ...state.musicMetadata,
                        currentTime: Math.trunc(audio.current.currentTime),
                        duration: Math.trunc(audio.current.duration)
                    }
                })
            }, 1000)
        } else !state.shouldIgnore && audio.current.pause()

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

    useEffect(() => { setTimeout(() => dispatch({ type: "removeLoading" }), 1500) }, [])

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}