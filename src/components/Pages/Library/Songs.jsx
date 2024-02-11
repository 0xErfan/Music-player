import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { VscDebugStart } from "react-icons/vsc";
import Track from './Track';
import { getUserInfo } from '../../../utils';
import { isLogin } from '../../../utils';
export default function Songs() {

    const navigate = useNavigate()
    const [mainUserData, setMainUserData] = useState([])

    useEffect(() => isLogin() ? setMainUserData(getUserInfo().user.user_metadata) : navigate("/logIn", { replace: true }), [])

    return (
        <>
            <section className='container'>
                <div className='flex items-center gap-6 my-6'>
                    <div onClick={() => navigate(-1, { replace: true })} className='flex cursor-pointer items-center justify-center bg-primary neoM-buttons rounded-full ch:size-8 p-2'><IoArrowBack /></div>
                    <h3 className='font-bold text-2xl'>All songs </h3>
                </div>
                <div className='flex items-center gap-2 justify-between px-3 basis-[85%] h-12 neoM-bg ' >
                    <input className='bg-primary outline-none placeholder:text-red-400/65 text-red-400/65' placeholder={`Search ${mainUserData.songs?.length} tracks...`} type="text" />
                    <div className='cursor-pointer'><CiSearch className='size-6' /></div>
                </div>
                <div className='flex items-center justify-end gap-4 ch:cursor-pointer my-6'>
                    <div className='flex items-center justify-center bg-primary neoM-buttons rounded-full ch:size-7 p-2'><LiaRandomSolid /></div>
                    <div className='flex items-center justify-center text-primary bg-primaryWhite rounded-full ch:size-7 p-2'><VscDebugStart /></div>
                </div>

                <div className='space-y-2'>
                    {
                        !mainUserData.songs?.length ?
                            <div className='text-2xl font-bold text-center'>No songs yet...</div>
                            :
                            mainUserData.songs.map(song => <Track key={song.id} {...song} />)
                    }
                </div>
            </section>
        </>
    )
}
