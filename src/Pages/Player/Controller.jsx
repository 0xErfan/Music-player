import React, { useContext, useEffect, useState } from 'react'
import { FiRepeat } from "react-icons/fi";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { GiPauseButton } from "react-icons/gi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { IoPlayBackSharp } from "react-icons/io5";
import { mainUserData } from '../../components/ReducerAndContexts';
import { States, StateDispatcher, musicUrl } from '../../components/ReducerAndContexts';
import { getUserInfo, padStarter } from '../../utils';


export default function Controller() {

    const { isPlaying, songIndex, currentSong, musicMetadata, toastData, like, setCurrentTime, shouldRepeat, isShuffle, shouldIgnore, musicVolume, setMusicVolume, share } = useContext(States)
    const [musicTimer, setMusicMetadata] = useState({ min: 0, sec: 0, currentMin: 0, currentSec: 0 })
    const [showVolume, setShowVolume] = useState(false)
    const [reseter, setReseter] = useState(false)
    const dispatch = useContext(StateDispatcher)

    useEffect(() => {

        if (!currentSong) {
            setMusicMetadata({ min: 0, sec: 0, currentMin: 0, currentSec: 0 })
            return
        }

        let { duration, currentTime } = musicMetadata;
        let updatedMusicTimer = { ...musicTimer };

        dispatch({ type: "shouldIntrapt", payload: false })
        updatedMusicTimer.min = Math.trunc(duration / 60);
        updatedMusicTimer.sec = Math.trunc(duration - updatedMusicTimer.min * 60);

        if (currentTime == duration || reseter) {
            updatedMusicTimer.currentMin = 0
            updatedMusicTimer.currentSec = 0

            if (isShuffle) {
                dispatch({ type: "changeCurrent", payload: Math.floor(Math.random() * mainUserData?.songs.length) })
                return
            } else if (shouldRepeat) {
                dispatch({ type: "changeCurrent", payload: songIndex })
                return
            }
            if (!shouldIgnore && !reseter) controllerActionHandler("next")
            setReseter(false)

        } else if (currentTime > 59) {
            updatedMusicTimer.currentMin = Math.trunc(currentTime / 60);
            updatedMusicTimer.currentSec = Math.trunc(currentTime - (updatedMusicTimer.currentMin * 60));
        } else updatedMusicTimer.currentSec = Math.trunc(currentTime);

        setMusicMetadata(updatedMusicTimer);
        return () => dispatch({ type: "shouldIntrapt", payload: true })

    }, [musicMetadata.currentTime, musicMetadata.duration]);

    const controllerActionHandler = (action, reset = null) => {
        if (!currentSong?.name) return
        if (shouldIgnore) dispatch({ type: "shouldIgnoreDisabler" })

        if (action == "next") {
            dispatch({ type: "changeCurrent", payload: songIndex == mainUserData?.songs.length - 1 ? 0 : songIndex + 1 })
        } else if (action == "preve") dispatch({ type: "changeCurrent", payload: songIndex == 0 ? mainUserData.songs.length - 1 : songIndex - 1 })

        reset && setReseter(true)
    }

    return (
        <div className='relative'>
            <div onClick={() => setShowVolume(false)} className={` ${showVolume ? "fixed" : "hidden"} inset-0 z-40`}></div>
            <div className={`flex items-center justify-center -rotate-90 w-[230px] duration-200 transition-all rounded-md absolute ${showVolume ? "-top-[12rem] opacity-1" : "opacity-0 -top-[42rem]"} -right-20 bg-transparent backdrop-blur-md h-12 z-50`}>
                <input
                    onChange={e => { dispatch({ type: "volumeChanger", payload: e.target.value }), setMusicVolume(e.target.value / 10) }}
                    value={musicVolume}
                    className='p-4 size-[90%]' min={1} max={10} type="range" />
            </div>
            <div className='flex flex-col mb-16 space-y-2'>
                <div className='flex items-center text-sm justify-between'>
                    <p>{currentSong ? padStarter(musicTimer.currentMin) + ":" + padStarter(musicTimer.currentSec) : "00:00"}</p>
                    <p>{musicMetadata.duration ? getUserInfo().user.user_metadata.songs.find(song => song.name == currentSong.name).duration : isPlaying ? "Loading..." : "00:00"}</p>
                </div>
                <input
                    style={{ background: `linear-gradient(90deg, #DA510B ${currentSong ? (musicMetadata.currentTime / musicMetadata.duration) * 100 : 0}%, #DFDFDF ${currentSong ? (musicMetadata.currentTime / musicMetadata.duration) * 100 - 100 : 0}%)` }}
                    onChange={e => setCurrentTime(e.target.value)}
                    value={musicMetadata.currentTime ?? 0}
                    className='timeLine' min={0} max={musicMetadata.duration ? musicMetadata.duration : ""} type="range"></input>
            </div>

            <div className='flex items-center justify-center gap-9 ch:fled ch:justify-center ch:rounded-xl ch:items-center ch:cursor-pointer'>
                <div
                    onClick={() => controllerActionHandler("preve", 1)}
                    className='neoM-buttons'><IoPlayBackSharp className='size-12 p-4' />
                </div>

                <div className='neoM-buttons overflow-hidden'>
                    {
                        isPlaying ?
                            <GiPauseButton onClick={() => dispatch({ type: "pause" })} className='bg-primaryOrange size-14 p-4' />
                            :
                            <VscDebugStart onClick={() => dispatch({ type: "play" })} className='bg-primaryOrange size-14 p-4' />
                    }
                </div>
                <div
                    onClick={() => controllerActionHandler("next", 1)}
                    className='neoM-buttons'><IoPlayBackSharp className='rotate-180 size-12 p-4' />
                </div>
            </div>

            <div className='flex items-center justify-center gap-3 mt-8 ch:cursor-pointer'>
                <div
                    onClick={() => { dispatch({ type: "shouldRepeatChanger", payload: !shouldRepeat }), dispatch({ type: "changeShuffle", payload: false }) }}
                    title='Repeat'
                    className='neoM-buttons'><FiRepeat className={`size-10 p-[10px] duration-200 ${shouldRepeat && "text-primaryOrange"}`} /></div>
                <div onClick={() => setShowVolume(preve => !preve)} className={`neoM-buttons ${showVolume && "text-primaryOrange"}`}><IoVolumeHigh className='size-10 p-[10px]' /></div>
                <div
                    className={`neoM-buttons ${mainUserData?.songs.find(song => song.liked && song.name == currentSong?.name) && "text-primaryOrange"}`}><IoMdHeart className='size-10 p-[10px]'
                        onClick={() => like("liked", currentSong?.name)}
                    />
                </div>
                <div onClick={() => share(musicUrl)} className='neoM-buttons'><IoShareSocialOutline className='size-10 p-[10px]' /></div>
            </div>
        </div>
    )
}