import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FiRepeat } from "react-icons/fi";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { GiPauseButton } from "react-icons/gi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { IoPlayBackSharp } from "react-icons/io5";
import { mainUserData } from '../../components/ReducerAndContexts';
import { States, StateDispatcher, musicUrl } from '../../components/ReducerAndContexts';
import { padStarter } from '../../utils';


export default function Controller() {

    const {
        isPlaying,
        currentSong,
        musicMetadata,
        like,
        setCurrentTime,
        shouldRepeat,
        musicVolume,
        setMusicVolume,
        share,
        changeMusic
    } = useContext(States)

    const [showVolume, setShowVolume] = useState(false)
    const dispatch = useContext(StateDispatcher)

    const { currentMin, currentSec, min, sec } = useMemo(() => {

        const currentMin = Math.trunc(musicMetadata.currentTime / 60)
        const currentSec = Math.trunc(musicMetadata.currentTime - (currentMin * 60))

        const min = Math.trunc(musicMetadata.duration / 60)
        const sec = Math.trunc(musicMetadata.duration - (min * 60))

        return { currentMin, currentSec, min, sec }

    }, [musicMetadata])

    return (
        <div className='relative'>

            <div onClick={() => setShowVolume(false)} className={` ${showVolume ? "fixed" : "hidden"} inset-0 z-40`}></div>

            <div className={`flex items-center justify-center -rotate-90 w-[230px] duration-200 transition-all rounded-md absolute ${showVolume ? "-top-[12rem] opacity-1" : "opacity-0 -top-[42rem]"} -right-20 bg-transparent backdrop-blur-md h-12 z-50`}>

                <input
                    onChange={e => {
                        dispatch({ type: "volumeChanger", payload: e.target.value })
                        setMusicVolume(e.target.value / 10)
                    }}
                    value={musicVolume}
                    className='p-4 size-[90%]' min={1} max={10} type="range"
                />

            </div>

            <div className='flex flex-col mb-16 space-y-2'>

                <div className='flex items-center text-sm justify-between'>
                    <p>{currentSong ? padStarter(currentMin) + ":" + padStarter(currentSec) : "00:00"}</p>
                    <p>{musicMetadata.duration ? `${padStarter(min)}:${padStarter(sec)}` : isPlaying ? "Loading..." : "00:00"}</p>
                </div>

                <input
                    style={{ background: `linear-gradient(90deg, #DA510B ${currentSong ? (musicMetadata.currentTime / musicMetadata.duration) * 100 : 0}%, #DFDFDF ${currentSong ? (musicMetadata.currentTime / musicMetadata.duration) * 100 - 100 : 0}%)` }}
                    onChange={e => setCurrentTime(e.target.value)}
                    value={musicMetadata?.currentTime ?? 0}
                    className='timeLine' min={0} max={musicMetadata?.duration ? musicMetadata?.duration : ""}
                    type="range"
                >
                </input>

            </div>

            <div className='flex items-center justify-center gap-9 ch:fled ch:justify-center ch:rounded-xl ch:items-center ch:cursor-pointer'>

                <div
                    onClick={() => changeMusic("prev")}
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
                    onClick={() => changeMusic("next")}
                    className='neoM-buttons'><IoPlayBackSharp className='rotate-180 size-12 p-4' />
                </div>

            </div>

            <div className='flex items-center justify-center gap-3 mt-8 ch:cursor-pointer'>

                <div
                    onClick={() => {
                        dispatch({ type: "shouldRepeatChanger", payload: !shouldRepeat })
                        dispatch({ type: "changeShuffle", payload: false })
                    }}
                    title='Repeat'
                    className='neoM-buttons'
                >
                    <FiRepeat className={`size-10 p-[10px] duration-200 ${shouldRepeat && "text-primaryOrange"}`} />
                </div>

                <div
                    onClick={() => setShowVolume(prev => !prev)}
                    className={`neoM-buttons ${showVolume && "text-primaryOrange"}`}
                >
                    <IoVolumeHigh className='size-10 p-[10px]' />
                </div>

                <div className={`neoM-buttons ${mainUserData?.songs.find(song => song.liked && song.name == currentSong?.name) && "text-primaryOrange"}`}>
                    <IoMdHeart
                        onClick={() => like("liked", currentSong?.name)}
                        className='size-10 p-[10px]'
                    />
                </div>

                <div onClick={() => share(musicUrl)} className='neoM-buttons'><IoShareSocialOutline className='size-10 p-[10px]' /></div>
            </div>
        </div>
    )
}