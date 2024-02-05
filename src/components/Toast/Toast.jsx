import React, { useContext } from 'react'
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { States } from '../DataContext/ReducerAndContexts';

export default function ({ text, status }) {
    const { showToast } = useContext(States)
    return (
        <>
            <div className={`h-16 neoM-bg ${!showToast ? "-left-[300px] hidden invisible opacity-0" : "left-4 absolute visible px-5 opacity-100"} border border-black/50 top-8 transition-all duration-300 z-40 bg-red-500 w-[300px] text-xl py-2 px-2 rounded-sm`}>
                <div className='flex mt-auto h-full items-center justify-between'>
                    <h4>{text}</h4>
                    {
                        status ? <FaCheck className={`text-green-400 size-6`} /> : <MdError className={`text-red-500 size-8`} />
                    }
                </div>
            </div>
        </>
    )
}