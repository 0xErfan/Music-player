import React, { useContext } from 'react'
import { IoTriangle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { SlUser } from "react-icons/sl";
import { StateDispatcher, States } from '../../ReducerAndContexts/ReducerAndContexts';
import { mainUserData } from '../../ReducerAndContexts/ReducerAndContexts';
import { supabase } from '../../../client';
import Toast from '../../Toast/Toast';

export default function Track(data) {

    const dispatch = useContext(StateDispatcher)
    const { toastData, songIndex, currentSong } = useContext(States)
    const { cover, id, name, artistname, duration, src } = data

    const palyerHandler = () => { dispatch({ type: "changeCurrent", payload: mainUserData.songs.findIndex(song => song.id == id) }) }

    const updater = () => data.onUpdater()

    const deleteHandler = async id => {
        const updatedData = mainUserData.songs.filter(song => song.id !== id)
        // make it separate later
        try {
            const { data, error } = await supabase.auth.updateUser({ data: { songs: updatedData } })

            if (error) throw new Error(error)
            dispatch({ type: "updater" })
            dispatch({
                type: "toastOn",
                text: "Music removed successfully !",
                status: 1
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 3000);
            updater()
        } catch (error) {
            dispatch({
                type: "toastOn",
                text: "Check your internet connection !",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);
        }
    }

    return (
        <div onClick={palyerHandler} className='flex items-center gap-3 max-w-full cursor-pointer'>
            <Toast text={toastData.text} status={toastData.status} />
            {
                cover ?
                    <img className='flex-1 shrink-0 size-14 rounded-sm object-cover aspect-square' src={cover} alt="img" />
                    :
                    <div className='flex duration-300'><SlUser className='size-[34px] p-1' /></div>
            }

            <div className='flex-[7] text-sm text-gray-200/50'>
                <h3 className='font-bold text-md text-primaryWhite line-clamp-1 max-w-[210px] ]'>{name ? name : "?"}</h3>
                <p className='text-sm'>{artistname ? artistname : "?"}</p>
                <div className='flex gap-2 items-center text-xs'>
                    <IoTriangle className='rotate-90 size-[10px]' />
                    <p>{duration ? duration : "00:00"}</p>
                </div>
            </div>
            <div onClick={() => deleteHandler(id)} className='flex-[1/2] active:bg-black/25 duration-300 aspect-square rounded-full'>
                <PiDotsThreeVerticalBold className='size-[34px] p-1' />
            </div>
        </div>
    )
}
