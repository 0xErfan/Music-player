import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { VscDebugStart } from "react-icons/vsc";
import Track from './Track';
import { getUserInfo, isLogin } from '../../../utils';
export default function Songs() {

    const [mainUserData, setMainUserData] = useState([])
    const [filteredSongs, setFilteredSongs] = useState([])
    const [update, setUpdate] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (isLogin()) {
            const userData = getUserInfo().user.user_metadata;
            setMainUserData(userData.songs);
        } else {
            navigate("/logIn", { replace: true });
        }
    }, [update]);

    const songUpdater = () => setUpdate(preve => !preve)

    useEffect(() => {
        if (mainUserData.length) {
            let filteredSongs;
            switch (params.type) {
                case "recentlies":
                    filteredSongs = mainUserData.slice(-5);
                    break;
                case "playlist":
                    filteredSongs = mainUserData.filter(song => song.liked);
                    break;
                case "favorites":
                    filteredSongs = mainUserData.filter(song => song.favorite);
                    break;
                default:
                    filteredSongs = mainUserData;
                    break;
            }
            // Update the UI with the filteredSongs
            // For example, you can set the filteredSongs to a state variable and use it in your UI\
            setFilteredSongs(filteredSongs);

        }
    }, [mainUserData, params.type]);

    return (
        <>
            <section className='container'>
                <div className='flex items-center gap-6 my-6'>
                    <div onClick={() => navigate(-1, { replace: true })} className='flex cursor-pointer items-center justify-center bg-primary neoM-buttons rounded-full ch:size-8 p-2'><IoArrowBack /></div>
                    <h3 className='font-bold text-2xl capitalize'>{params.type ? params.type : "All songs"}</h3>
                </div>
                <div className='flex items-center gap-2 justify-between px-3 basis-[85%] h-12 neoM-bg ' >
                    <input className='bg-primary outline-none placeholder:text-red-400/65 text-red-400/65' placeholder={`Search ${filteredSongs?.length} tracks...`} type="text" />
                    <div className='cursor-pointer'><CiSearch className='size-6' /></div>
                </div>
                <div className='flex items-center justify-end gap-4 ch:cursor-pointer my-6'>
                    <div onClick={songUpdater} className='flex items-center justify-center bg-primary neoM-buttons rounded-full ch:size-7 p-2'><LiaRandomSolid /></div>
                    <div className='flex items-center justify-center text-primary bg-primaryWhite rounded-full ch:size-7 p-2'><VscDebugStart /></div>
                </div>

                <div className='space-y-2'>
                    {
                        !filteredSongs?.length ?
                            <div className='text-2xl font-bold text-center'>No songs yet...</div>
                            :
                            filteredSongs.map(song => <Track key={song.id} onUpdater={songUpdater} {...song} />)
                    }
                </div>
            </section>
        </>
    )
}
