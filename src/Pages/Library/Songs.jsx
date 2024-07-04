import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { VscDebugStart } from "react-icons/vsc";
import { GiPauseButton } from "react-icons/gi";
import Track from './Track';
import { States, StateDispatcher } from '../../components/ReducerAndContexts';
import { getUserInfo } from '../../utils';


export default function Songs() {

    const { isShuffle, isPlaying, updater, userSongsStorage } = useContext(States)
    const dispatch = useContext(StateDispatcher)
    const [filteredSongs, setFilteredSongs] = useState(getUserInfo()?.user.user_metadata.songs)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const userMetadataSongs = getUserInfo()?.user.user_metadata.songs
    const [userSongs, setUserSongs] = useState()
    
    useLayoutEffect(() => setFilteredSongs(userMetadataSongs?.length ? userMetadataSongs : userSongsStorage), [updater, userSongsStorage]);

    useEffect(() => {

        if (filteredSongs?.length) {

            let updatedSongs;

            switch (params.type) {
                case "recentlies": { updatedSongs = [...filteredSongs].reverse(); break }
                case "playlist": { updatedSongs = [...filteredSongs].filter(song => song.favorite); break }
                case "favorites": { updatedSongs = [...filteredSongs].filter(song => song.liked); break }
                case "/": { updatedSongs = [...filteredSongs].filter(song => song.liked); break }
                default: updatedSongs = [...filteredSongs];
            }
            
            setUserSongs(updatedSongs);
        }

    }, [params.type, updater, filteredSongs]);

    const songSearchHandler = e => {

        const newSongsFilter = (userSongs?.length ? userSongs : userSongsStorage)?.filter(song => song.name.toLowerCase().includes(e.target.value.toLowerCase()))

        setSearch(e.target.value)
        setFilteredSongs(newSongsFilter)
    }

    return (
        <>
            <section className='container'>

                <div className='flex items-center gap-6 my-6'>
                    <div onClick={() => navigate(-1)} className='flex cursor-pointer items-center justify-center bg-primary neoM-buttons duration-200 transition-all rounded-full ch:size-8 p-2'><IoArrowBack /></div>
                    <h3 className='font-bold text-2xl capitalize'>{params.type || "All songs"}</h3>
                </div>

                <div className='flex items-center gap-2 justify-between px-3 basis-[85%] h-12 neoM-bg ' >
                    <input
                        value={search}
                        onChange={songSearchHandler}
                        className='flex-[6] bg-primary outline-none placeholder:text-red-400/65 text-red-400/65'
                        placeholder={`Search in ${filteredSongs?.length} musics...`}
                        type="text"
                    />
                    <div className='cursor-pointer'><CiSearch className='size-6 flex-1' /></div>
                </div>

                <div className='flex items-center justify-end gap-4 ch:cursor-pointer my-6'>

                    <div onClick={() => {
                        dispatch({ type: "changeShuffle", payload: !isShuffle })
                        dispatch({ type: "shouldRepeatChanger", payload: isShuffle && false })
                    }}
                        className={`flex items-center justify-center bg-primary neoM-buttons duration-200 transition-all ${isShuffle && "text-primaryOrange"} duration-200 rounded-full ch:size-7 p-2`}
                    >
                        <LiaRandomSolid />
                    </div>

                    <div
                        onClick={() => dispatch({ type: isPlaying ? "pause" : "play" })}
                        className='flex items-center justify-center text-primary bg-primaryWhite rounded-full ch:size-7 p-2'
                    >
                        {
                            isPlaying ? <GiPauseButton /> : <VscDebugStart />
                        }
                    </div>
                </div>

                <div className='space-y-2'>
                    {
                        !userSongs?.length
                            ?
                            <div className='text-2xl font-bold text-center'>No songs yet...</div>
                            :
                            userSongs.map(song => <Track key={song.id} {...song} />)
                    }
                </div>

            </section>
        </>
    )
}