import React, { useContext } from 'react'
import { IoTriangle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { SlUser } from "react-icons/sl";
import { StateDispatcher, States } from '../../ReducerAndContexts/ReducerAndContexts';

export default function Track(data) {

    const { cover, name, artistname, duration, src } = data

    const state = useContext(States)
    const dispatch = useContext(StateDispatcher)
    const palyerHandler = () => {
        dispatch({ type: "changeCurrent", payload: { ...data } })
        console.log(state.currentSong);
    }

    return (
        <div onClick={palyerHandler} className='flex items-center gap-3 max-w-full cursor-pointer'>
            {
                cover ?
                    <img className='flex-1 shrink-0 size-14 rounded-sm object-cover aspect-square' src={cover} alt="img" />
                    :
                    <div className='flex duration-300'><SlUser className='size-[34px] p-1' /></div>
            }

            {/* <audio src={src}></audio> */}

            <div className='flex-[7] text-sm text-gray-200/50'>
                <h3 className='font-bold text-md text-primaryWhite line-clamp-1 max-w-[210px] ]'>{name ? name : "?"}</h3>
                <p className='text-sm'>{artistname ? artistname : "?"}</p>
                <div className='flex gap-2 items-center text-xs'>
                    <IoTriangle className='rotate-90 size-[10px]' />
                    <p>{duration ? duration : "00:00"}</p>
                </div>
            </div>
            <div className='flex-[1/2] active:bg-black/25 duration-300 aspect-square rounded-full'>
                <PiDotsThreeVerticalBold className='size-[34px] p-1' />
            </div>
        </div>
    )
}
