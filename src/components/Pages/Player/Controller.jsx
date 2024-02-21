import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiRepeat } from "react-icons/fi";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { GiPauseButton } from "react-icons/gi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { IoPlayBackSharp } from "react-icons/io5";
import { States, StateDispatcher } from '../../ReducerAndContexts';
import { mainUserData } from '../../ReducerAndContexts';
import { musicUrl } from '../../ReducerAndContexts';
import Toast from '../../Toast';

export default function Controller() {

    const { isPlaying, songIndex, currentSong, musicMetadata, toastData, like, setCurrentTime, shouldRepeat, shouldIgnore, musicVolume } = useContext(States)
    const [musicTimer, setMusicMetadata] = useState({ min: 0, sec: 0, currentMin: 0, currentSec: 0 })
    const [showVolume, setShowVolume] = useState(false)
    const dispatch = useContext(StateDispatcher)

    useEffect(() => {
        let { duration, currentTime } = musicMetadata;
        let updatedMusicTimer = { ...musicTimer };

        updatedMusicTimer.min = Math.trunc(duration / 60);
        updatedMusicTimer.sec = Math.trunc(duration - updatedMusicTimer.min * 60);

        if (currentTime == duration) {
            updatedMusicTimer.currentMin = 0
            updatedMusicTimer.currentSec = 0
            dispatch({ type: "changeCurrent", payload: songIndex == mainUserData?.songs.length - 1 ? 0 : shouldRepeat ? songIndex : songIndex + 1 })
        } else if (currentTime > 59) {
            updatedMusicTimer.currentMin = Math.trunc(currentTime / 60);
            updatedMusicTimer.currentSec = Math.trunc(currentTime - (updatedMusicTimer.currentMin * 60));
        } else updatedMusicTimer.currentSec = Math.trunc(currentTime);

        setMusicMetadata(updatedMusicTimer);

    }, [musicMetadata.currentTime, musicMetadata.duration], mainUserData);

    const shareMusic = async url => await navigator.share({ title: "Listen to this music(:", url }).then(data => console.log(data)).catch(err => console.log(err))

    return (
        <div className='relative'>
            <Toast key="toast" text={toastData.text} status={toastData.status} />
            <div onClick={() => setShowVolume(false)} className={` ${showVolume ? "fixed" : "hidden"} inset-0 z-40`}></div>
            <div className={`flex items-center justify-center -rotate-90 w-[230px] duration-200 transition-all rounded-md absolute ${showVolume ? "-top-[12rem] opacity-1" : "opacity-0 -top-[42rem]"} -right-20 bg-transparent backdrop-blur-md h-12 z-50`}>
                <input
                    onChange={e => dispatch({ type: "volumeChanger", payload: e.target.value })}
                    value={musicVolume}
                    className='p-4 size-[90%]' max={10} type="range" />
            </div>
            <div className='flex flex-col mb-16 space-y-2'>
                <div className='flex items-center text-sm justify-between'>
                    {/*create padStart generator */}
                    <p>{`${musicTimer.currentMin.toString().padStart(2, "0")}:${musicTimer.currentSec.toString().padStart(2, "0")}`}</p>
                    <p>{`${musicTimer.min.toString().padStart(2, "0")}:${musicTimer.sec.toString().padStart(2, "0")}`}</p>
                </div>
                <input
                    style={{ background: `linear-gradient(90deg, #DA510B ${(musicMetadata.currentTime / musicMetadata.duration) * 100}%, #DFDFDF ${(musicMetadata.currentTime / musicMetadata.duration) * 100 - 100}%)` }}
                    onChange={e => setCurrentTime(e.target.value)}
                    value={musicMetadata.currentTime ?? 0}
                    className='timeLine' min={0} max={musicMetadata.duration ? musicMetadata.duration : ""} type="range"></input>
            </div>

            <div className='flex items-center justify-center gap-9 ch:fled ch:justify-center ch:rounded-xl ch:items-center ch:cursor-pointer'>
                <div
                    onClick={() => {
                        if (shouldIgnore) dispatch({ type: "shouldIgnoreDisabler" })
                        dispatch({ type: "changeCurrent", payload: songIndex == 0 ? mainUserData.songs.length - 1 : songIndex - 1 })
                    }}
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
                    onClick={() => {
                        if (shouldIgnore) dispatch({ type: "shouldIgnoreDisabler" })
                        dispatch({ type: "changeCurrent", payload: songIndex == mainUserData?.songs.length - 1 ? 0 : songIndex + 1 })
                    }}
                    className='neoM-buttons'><IoPlayBackSharp className='rotate-180 size-12 p-4' />
                </div>
            </div>

            <div className='flex items-center justify-center gap-3 mt-8 ch:cursor-pointer'>
                <div
                    onClick={() => dispatch({ type: "shouldRepeatChanger", payload: !shouldRepeat })}
                    title='Repeat'
                    className='neoM-buttons'><FiRepeat className={`size-10 p-[10px] duration-200 ${shouldRepeat && "text-primaryOrange"}`} /></div>
                <div onClick={() => setShowVolume(preve => !preve)} className={`neoM-buttons ${showVolume && "text-primaryOrange"}`}><IoVolumeHigh className='size-10 p-[10px]' /></div>
                <div
                    className={`neoM-buttons ${mainUserData?.songs.find(song => song.liked && song.name == currentSong?.name) && "text-primaryOrange"}`}><IoMdHeart className='size-10 p-[10px]'
                        onClick={() => like(currentSong.name)}
                    />
                </div>
                <div onClick={() => shareMusic(musicUrl)} className='neoM-buttons'><IoShareSocialOutline className='size-10 p-[10px]' /></div>
            </div>
        </div>
    )
}