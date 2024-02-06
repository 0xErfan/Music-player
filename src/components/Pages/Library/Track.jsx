import React from 'react'
import { IoTriangle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
export default function Track() {
    return (
        <div className='flex items-center gap-3 max-w-full'>
            <img className='flex-1 shrink-0 size-14 rounded-sm object-cover aspect-square' src="images/city.jpg" alt="img" />
            <div className='flex-[7] text-sm text-gray-200/50'>
                <h3 className='font-bold text-md text-primaryWhite line-clamp-1 max-w-[210px] ]'>GaAGH [Prod. By Holly]</h3>
                <p className='text-sm'>Bahram</p>
                <div className='flex gap-2 items-center text-xs'>
                    <IoTriangle className='rotate-90 size-[10px]' />
                    <p>342K .</p>
                    <p>6:31</p>
                </div>
            </div>
            <div className='flex-1 active:bg-black/25 duration-300 rounded-full cursor-pointer'>
                <PiDotsThreeVerticalBold className='size-[34px] p-1' />
            </div>
        </div>
    )
}
