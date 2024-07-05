import React, { useEffect, useRef } from 'react'
import { createContext, useReducer } from 'react'
import { isLogin, getUserInfo } from '../utils';
import { supabase } from '../client';

export const StateDispatcher = createContext(null);
export const States = createContext(null);
export let mainUserData;
export let musicUrl;

function stateReducer(state, action) {
    switch (action.type) {
        case "pause": {
            return { ...state, isPlaying: 0 };
        }
        case "play": {
            if (state.currentSong) {
                return { ...state, isPlaying: 1, shouldIgnore: false }
            } else {
                return { ...state }
            }
        }
        case "clearCurrentSongs": {
            return { ...state, isPlaying: 0, currentSong: null }
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
        case "recentlyPlayedSongsChange": {
            return { ...state, recentlyPlayedSongs: action.payload }
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
        case "shouldIntrapt": {
            return { ...state, shouldIntrapt: action.payload }
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
        shouldIntrapt: false,
        currentSong: null,
        musicMetadata: { currentTime: null, duration: null },
        toastData: { text: null, status: 0, loader: 0 },
        userData: null,
        userSongsStorage: [],
        recentlyPlayedSongs: [],
    })

    let audio = useRef(new Audio());

    let userMetadata = state.userData && getUserInfo()?.user.user_metadata
    mainUserData = userMetadata

    state.share = async url => { if (state.currentSong?.name) await navigator.share({ title: "Listen to this music(:", url }) }

    state.setMusicVolume = (volume) => { audio.current.volume = volume }

    state.like = async (action, name) => {

        if (!state.currentSong?.name) return

        if (!state.isLogin) {

            dispatch({
                type: "toastOn",
                text: "Please Login first",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);

            return
        }

        if (getUserInfo().user.user_metadata.songs?.length) {

            try {

                let updatedData = [...getUserInfo().user.user_metadata.songs]
                let isAdded

                updatedData.some(song => {
                    if (song.name == name) {
                        song[action] = !song[action]
                        isAdded = song[action]
                        return true
                    }
                })

                const { _, error } = await supabase.auth.updateUser({ data: { songs: updatedData } })
                if (error) throw new Error(error)

                if (action !== 'liked') {

                    dispatch({
                        type: "toastOn",
                        text: `Music  ${isAdded ? 'added to ' : 'removed from '} playlist`,
                        status: 1
                    })
                    setTimeout(() => dispatch({ type: "toastOff" }), 2000);
                }

                dispatch({ type: "filteredSongsUpdater" })
                // dispatch({ type: "updater" })

            } catch (error) {
                dispatch({
                    type: "toastOn",
                    text: "Check your internet connection !",
                    status: 0
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 2000);
            }
        }
    }

    state.setCurrentTime = time => {
        audio.current.currentTime = time
        dispatch({ type: "play" })
    }

    state.changeMusic = (action = 'next') => {

        if (state.isShuffle) return dispatch({ type: "changeCurrent", payload: Math.floor(Math.random() * state.userSongsStorage?.length) })

        if (state.shouldRepeat) return audio.current.currentTime == audio.current.duration ? dispatch({ type: "changeCurrent", payload: state.songIndex }) : audio.current.currentTime = 0

        if (state.shouldIgnore) dispatch({ type: "shouldIgnoreDisabler" })

        dispatch({
            type: "changeCurrent",
            payload: action == 'next'
                ?
                state.songIndex == state.userSongsStorage?.length - 1 ? 0 : state.songIndex + 1
                :
                state.songIndex == 0 ? state.userSongsStorage?.length - 1 : state.songIndex - 1
        })
    }

    state.stopMusic = () => { audio.current?.pause() }

    const fetchMusic = async () => {

        if (!audio.current) audio.current = new Audio() //re-assign the audio if the user logged out(logout will make audio null)

        if (state.currentSong) {
            musicUrl = state.currentSong?.isDefault || !state.isLogin
                ?
                `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/default-musics/${state.currentSong.name}`
                :
                `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/users/${getUserInfo().user.email}/${state.currentSong.name}`

            audio.current.src = musicUrl
        }
    }

    async function fetchData() {

        if (isLogin()) {

            const userSongs = getUserInfo()?.user.user_metadata.songs
            dispatch({ type: "storageManage", payload: userSongs })

        } else {

            const { data: defaultSongs, error } = await supabase.storage.from("default-musics").list()
            const defaultSongsUpdate = defaultSongs.filter(songs => songs.name !== '.emptyFolderPlaceholder')

            if (error) {
                dispatch({
                    type: "toastOn",
                    text: "Check your internet connection!",
                    status: 0
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 3000);
                return;
            }

            dispatch({ type: "storageManage", payload: defaultSongsUpdate })
        }

    }

    useEffect(() => {
        if (state.userSongsStorage?.length) state.currentSong = state.userSongsStorage[state.songIndex]
    }, [state.userSongsStorage, state.songIndex])

    useEffect(() => {

        if (!state.recentlyPlayedSongs) return dispatch({ type: "recentlyPlayedSongsChange", payload: [] }) // if uesr remove the last music of array
        if (!state.currentSong?.name) return

        let recentlyPlayed = [...state.recentlyPlayedSongs]
        let repeatedSong = [...recentlyPlayed].filter(song => song.name == state.currentSong?.name)

        if (repeatedSong.length) {
            recentlyPlayed = recentlyPlayed.filter(song => song.name != state.currentSong.name)
            state.isPlaying && recentlyPlayed.push(repeatedSong[0])
        } else if (recentlyPlayed.length <= 4) {
            state.isPlaying && recentlyPlayed.push({ ...state.currentSong })
        } else {
            recentlyPlayed[recentlyPlayed.length - 1] = state.currentSong
        }

        recentlyPlayed = recentlyPlayed.filter(song => state.userSongsStorage.find(data => data.name == song.name)?.name == song.name)

        dispatch({ type: "recentlyPlayedSongsChange", payload: recentlyPlayed })

    }, [state.currentSong, state.userSongsStorage, state.filteredSongsUpdater])

    useEffect(() => {

        let timer

        if (!state.currentSong?.name) return;
        if (audio.current.currentTime == audio.current.duration) state.changeMusic()

        if (state.isPlaying) {

            !state.shouldIgnore && audio.current?.play()

            timer = setInterval(() => {
                dispatch({
                    type: "changeMetadata", payload: {
                        ...state.musicMetadata,
                        currentTime: Math.trunc(audio.current?.currentTime),
                        duration: Math.trunc(audio.current?.duration)
                    }
                })
            }, 1000)

        } else !state.shouldIgnore && audio.current?.pause()

        return () => clearInterval(timer)
    }, [state.currentSong, state.isPlaying, state.musicMetadata])

    useEffect(() => {

        const checkLoginStatus = () => {

            const isLoggedIn = isLogin()
            dispatch({ type: "logCheck", payload: isLogin() })

            isLoggedIn && dispatch({ type: "fetchData", payload: getUserInfo() })
            fetchData()
        }

        checkLoginStatus();
    }, [state.filteredSongsUpdater, state.updater, state.userData?.length])

    useEffect(() => { state.currentSong?.name && fetchMusic() }, [state.currentSong?.name])
    useEffect(() => { setTimeout(() => dispatch({ type: "removeLoading" }), 1500) }, [])

    //External device controllers
    navigator.mediaSession.setActionHandler("nexttrack", () => dispatch({ type: "changeCurrent", payload: state.songIndex == mainUserData?.songs.length - 1 ? 0 : state.songIndex + 1 }))
    navigator.mediaSession.setActionHandler("previoustrack", () => dispatch({ type: "changeCurrent", payload: state.songIndex == 0 ? mainUserData.songs.length - 1 : state.songIndex - 1 }))
    navigator.mediaSession.setActionHandler("pause", () => dispatch({ type: "pause" }))
    navigator.mediaSession.setActionHandler("play", () => dispatch({ type: "play" }))

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}