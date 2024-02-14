import React, { useContext } from 'react'
import { FiRepeat } from "react-icons/fi";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { GiPauseButton } from "react-icons/gi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { IoPlayBackSharp } from "react-icons/io5";
import { States, StateDispatcher } from '../../ReducerAndContexts/ReducerAndContexts';
import { mainUserData } from '../../ReducerAndContexts/ReducerAndContexts';
import { supabase } from '../../../client';
import Toast from '../../Toast/Toast';

export default function Controller({ src, audio }) {

    const { isPlaying, currentSong, toastData } = useContext(States)
    const dispatch = useContext(StateDispatcher)

    const songLikeHandler = async () => {

        if (mainUserData.songs.length) {
            try {

                let updatedData = [...mainUserData.songs]

                updatedData.some(song => {
                    if (song.id == currentSong.id) {
                        song.liked = !song.liked
                        return true
                    }
                })

                const { data, error } = await supabase.auth.updateUser({
                    data: { songs: updatedData }
                })
                if (error) throw new Error(error)
            } catch (error) {
                console.log(error);
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

    return (
        <>
            <Toast text={toastData.text} status={toastData.status} />
            <div className='flex flex-col mb-16 space-y-2'>
                <div className='flex items-center text-sm justify-between'>
                    <p>2:43</p>
                    <p>3:50</p>
                </div>
                <input className='timeLine' type="range"></input>
            </div>

            <div className='flex items-center justify-center gap-9 ch:fled ch:justify-center ch:rounded-xl ch:items-center ch:cursor-pointer'>
                <div
                    onClick={() => dispatch({ type: "changeCurrent", payload: currentSong.id == 0 ? mainUserData.songs.length - 1 : currentSong.id - 1 })}
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
                    onClick={() => dispatch({ type: "changeCurrent", payload: currentSong.id == mainUserData.songs.length - 1 ? 0 : currentSong.id + 1 })}
                    className='neoM-buttons'><IoPlayBackSharp className='rotate-180 size-12 p-4' />
                </div>
            </div>

            <div className='flex items-center justify-center gap-3 mt-8 ch:cursor-pointer'>
                <div className='neoM-buttons'><FiRepeat className='size-10 p-[10px]' /></div>
                <div className='neoM-buttons'><IoVolumeHigh className='size-10 p-[10px]' /></div>
                <div
                    className={`neoM-buttons ${currentSong?.liked && "text-primaryOrange"}`}><IoMdHeart className='size-10 p-[10px]'
                        onClick={songLikeHandler}
                    />
                </div>
                <div className='neoM-buttons'><IoShareSocialOutline className='size-10 p-[10px]' /></div>
            </div>
        </>
    )
}