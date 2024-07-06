import React, { useContext, useEffect, useState } from 'react'
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mainUserData } from './ReducerAndContexts';
import { States, StateDispatcher } from './ReducerAndContexts';
import { isLogin, tagRemover } from '../utils';
import Toast from './Toast';

export default function Nav() {

    const [activeNav, steActiveNav] = useState(location.pathname)
    const { currentSong, isPlaying, like, musicMetadata, toastData } = useContext(States)
    const [audioData, setAudioData] = useState({ duration: 0, currentTime: 0 })
    const dispatch = useContext(StateDispatcher)
    const navigate = useNavigate()

    useEffect(() => steActiveNav(location.hash), [location.hash])

    useEffect(() => {
        const updatedData = { duration: 0, currentTime: 0 }
        const { duration, currentTime } = musicMetadata

        updatedData.currentTime = currentTime
        updatedData.duration = duration

        setAudioData({ ...updatedData })
    }, [musicMetadata.duration, musicMetadata.currentTime])

    return (
        <>
            <Toast key="toast" text={toastData.text} status={toastData.status} loader={toastData.loader} />
            
            <nav
                onClick={e => (!e.target.className.toString() || e.target.className.toString().includes("font")) && navigate("/player")}
                className="navbar fixed m-auto w-full max-w-[500px] bottom-0 left-0 right-0 z-20 text-primaryWhite">

                <div>
                    {
                        currentSong && (!activeNav.includes('/login') && !activeNav.includes('/signUp')) && (
                            <div className='flex items-center justify-between relative px-4 py-2 text-sm inset-0 bg-black/70 gap-4'>
                                <div
                                    onClick={() => dispatch({ type: isPlaying ? "pause" : "play" })}
                                    className='flex flex-1 items-center cursor-pointer justify-center ch:size-5'
                                >{isPlaying ? <GiPauseButton /> : <VscDebugStart />}</div>
                                <div className='flex-[8]'>
                                    <h3 className='font-bold line-clamp-1'>{tagRemover(currentSong.name) || "?"}</h3>
                                    <p>{currentSong.artist || "?"}</p>
                                </div>
                                <div style={{ width: `${(audioData.currentTime / audioData.duration) * 100}%` }} className={`h-[2px] bg-primaryOrange absolute bottom-0 right-0 left-0 rounded-full`}></div>
                                <div
                                    onClick={() => like("liked", currentSong.name)}
                                    className={`flex flex-1 items-center cursor-pointer ${mainUserData?.songs.find(song => song.liked && song.name == currentSong.name) && "text-primaryOrange"} justify-center ch:size-5`}><FaHeart /></div>
                            </div>
                        )
                    }

                    <div className='mainNav'>
                        <ul className='grid grid-cols-4 text-xs text-center ch:py-3'>

                            <Link to="/" className={`flex ${(activeNav == "#/" || activeNav == "" || activeNav.includes("/artists") || activeNav.includes("/album") || activeNav.includes("/songs")) && "activeNav"} flex-col`}>
                                <div className='flex items-center justify-center cursor-pointer'>
                                    <AiFillHome className='size-6' />
                                </div>
                                Home
                            </Link>

                            <Link to="/player" className={`flex text-primaryOrange ${activeNav.includes("/player") && "activeNav"} flex-col`}>
                                <div className='flex items-center justify-center'>
                                    <VscDebugStart className='size-6' />
                                </div>
                                Player
                            </Link>

                            <Link to="/search" className={`flex ${activeNav.includes("search") && "activeNav"} flex-col`}>
                                <div className='flex items-center justify-center cursor-pointer'>
                                    <CiSearch className='size-6' />
                                </div>
                                Search
                            </Link>

                            <Link to="/account" className={`flex ${activeNav.includes("account") && "activeNav"} flex-col`}>
                                <div className='flex items-center justify-center cursor-pointer'>
                                    <FaUser className='size-6' />
                                    <span className={`${!isLogin() && "relative loginAlert"} `}></span>
                                </div>
                                Account
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}