import React, { useEffect, useState } from 'react'
import { GiPauseButton } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Nav() {

    const [activeNav, steActiveNav] = useState(location.pathname)

    return (
        <nav className="fixed bottom-0 right-0 left-0 z-40 text-primaryWhite">
            <div className=''>
                {
                    "" && (
                        <div className='flex items-center justify-between relative px-4 py-2 text-sm bg-gray-800 gap-4'>
                            <div className='flex flex-1 items-center justify-center ch:size-5'>{"w" ? <GiPauseButton /> : <VscDebugStart />}</div>

                            <div className='flex-[8]'>
                                <h3 className='font-bold'>Danial - Kado</h3>
                                <p>Danial</p>
                            </div>
                            <div className='h-[2px] bg-primaryOrange absolute bottom-0 right-0 left-0 w-1/3 rounded-full'></div>
                            <div className='flex flex-1 items-center justify-center ch:size-5'><FaRegHeart /></div>
                        </div>
                    )
                }
                <div className='mainNav'>
                    <ul className='grid grid-cols-4 text-xs text-center ch:py-3 ch-hover:bg-[#2E3239] ch:duration-200'>
                        <Link onClick={() => steActiveNav("/")} to="/" className={`flex ${(activeNav == "/" || activeNav.includes("/songs")) && "activeNav"} flex-col`}>
                            <div className='flex items-center justify-center cursor-pointer'>
                                <AiFillHome className='size-6' />
                            </div>
                            <p>Home</p>
                        </Link>
                        <Link onClick={() => steActiveNav("player")} to="/player" className={`flex ${activeNav.includes("player") && "activeNav"} flex-col`}>
                            <div className='flex items-center justify-center cursor-pointer'>
                                <VscDebugStart className='size-6' />
                            </div>
                            <p>Player</p>
                        </Link>
                        <Link onClick={() => steActiveNav("search")} to="/search" className={`flex ${activeNav.includes("search") && "activeNav"} flex-col`}>
                            <div className='flex items-center justify-center cursor-pointer'>
                                <CiSearch className='size-6' />
                            </div>
                            <p>Search</p>
                        </Link>
                        <Link onClick={() => steActiveNav("account")} to="/account" className={`flex ${activeNav.includes("account") && "activeNav"} flex-col`}>
                            <div className='flex items-center justify-center cursor-pointer'>
                                <FaUser className='size-6' />
                            </div>
                            <p>Account</p>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
