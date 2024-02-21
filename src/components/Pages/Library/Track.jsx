import React, { useContext, useState } from 'react'
import { IoTriangle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FiMusic } from "react-icons/fi";
import { StateDispatcher, States } from '../../ReducerAndContexts';
import { GiPauseButton } from "react-icons/gi";
import { mainUserData } from '../../ReducerAndContexts';
import { supabase } from '../../../client';
import Toast from '../../Toast';

export default function Track(data) {

    const dispatch = useContext(StateDispatcher)
    const { toastData, userSongsStorage, userData, currentSong, isPlaying } = useContext(States)
    const { cover, id, name, artistname, duration } = data

    const palyerHandler = () => { dispatch({ type: "changeCurrent", payload: [...userSongsStorage].findIndex(song => song.name == name) }) }

    const updater = () => { data.onUpdater(id) }

    const deleteHandler = async () => {
        const updatedData = [...mainUserData.songs].filter(song => song.id !== id)
        // make it separate later
        try {
            const { data, error } = await supabase.storage.from("users").remove(userData[0].user.email + `/${name}`)
            if (error) throw new Error(error)

            const { updatedSongsData, updatedSongsError } = await supabase.auth.updateUser({ data: { songs: updatedData } })
            if (updatedSongsError) throw new Error(updatedSongsError)

            dispatch({ type: "updater" })
            dispatch({
                type: "toastOn",
                text: "Music removed successfully !",
                status: 1
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 3000);
            updater()
        } catch (error) {
            console.log(error);
            dispatch({
                type: "toastOn",
                text: "Check your internet connection !",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);
        }
    }

    return (
        <div className='flex items-center gap-3 max-w-full cursor-pointer'>
            <Toast text={toastData.text} status={toastData.status} />
            {
                cover ?
                    <img className='flex-1 shrink-0 size-14 rounded-sm object-cover aspect-square' src={cover} alt="img" />
                    :
                    <div className='flex duration-300'><FiMusic className='size-[34px] p-1' /></div>
            }

            <div onClick={palyerHandler} className='flex-[7] text-sm text-gray-200/50'>
                <h3 className='font-bold text-md text-primaryWhite line-clamp-1 max-w-[210px] ]'>{name ? name : "?"}</h3>
                <p className='text-sm'>{artistname ? artistname : "?"}</p>
                <div className='flex gap-2 items-center text-xs'>
                    {
                        (currentSong?.name == name && isPlaying) ?
                            <p className='flex items-center text-red-400'>Now Playing</p>
                            :
                            <IoTriangle className='rotate-90 size-[10px]' />
                    }

                    <p>{duration ? duration : "00:00"}</p>
                </div>
            </div>
            <div onClick={deleteHandler} className='flex-[1/2] active:bg-black/25 duration-300 aspect-square rounded-full'>
                <PiDotsThreeVerticalBold className='size-[34px] p-1' />
            </div>
        </div>
    )
}
