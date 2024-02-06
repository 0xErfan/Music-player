import React from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { VscDebugStart } from "react-icons/vsc";
import Track from './Track';

export default function Songs() {


    return (
        <>
            <section className='container'>
                <div className='flex items-center gap-6 my-6'>
                    <div onClick={() => history.back()} className='flex cursor-pointer items-center justify-center bg-primary neoM-buttons rounded-full ch:size-8 p-2'><IoArrowBack /></div>
                    <h3 className='font-bold text-2xl'>Liked tracks</h3>
                </div>
                <div className='flex items-center gap-2 justify-between px-3 basis-[85%] h-12 neoM-bg ' >
                    <input className='bg-primary outline-none placeholder:text-red-400/65 text-red-400/65' placeholder='Search 52 tracks...' type="text" />
                    <div className='cursor-pointer'><CiSearch className='size-6' /></div>
                </div>
                <div className='flex items-center justify-end gap-4 ch:cursor-pointer my-6'>
                    <div className='flex items-center justify-center bg-primary neoM-buttons rounded-full ch:size-7 p-2'><LiaRandomSolid /></div>
                    <div className='flex items-center justify-center text-primary bg-primaryWhite rounded-full ch:size-7 p-2'><VscDebugStart /></div>
                </div>
                <div className='space-y-2'>
                    <Track />
                    <Track />
                    <Track />
                    <Track />
                    <Track />
                </div>
            </section>
        </>
    )
}
