import React from 'react'
import { GiPauseButton } from "react-icons/gi";
import { FiRepeat } from "react-icons/fi";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { IoPlayBackSharp } from "react-icons/io5";

export default function Controller() {
    return (
        <>
            <div className='flex flex-col mb-16 space-y-2'>
                <div className='flex items-center text-sm justify-between'>
                    <p>2:43</p>
                    <p>3:50</p>
                </div>
                <input className='timeLine' type="range"></input>
            </div>

            <div className='flex items-center justify-center gap-9 ch:fled ch:justify-center ch:rounded-xl ch:items-center ch:cursor-pointer'>
                <div className='neoM-buttons'><IoPlayBackSharp className='size-12 p-4' /></div>
                <div className='neoM-buttons overflow-hidden'><GiPauseButton className='bg-primaryOrange size-14 p-4' /></div>
                <div className='neoM-buttons'><IoPlayBackSharp className='rotate-180 size-12 p-4' /></div>
            </div>

            <div className='flex items-center justify-center gap-3 mt-8 ch:cursor-pointer'>
                <div className='neoM-buttons'><FiRepeat className='size-10 p-[10px]' /></div>
                <div className='neoM-buttons'><IoVolumeHigh className='size-10 p-[10px]' /></div>
                <div className='neoM-buttons'><IoMdHeart className='size-10 p-[10px]' /></div>
                <div className='neoM-buttons'><IoShareSocialOutline className='size-10 p-[10px]' /></div>
            </div>
        </>
    )
}
