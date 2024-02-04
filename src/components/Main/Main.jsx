import React from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BiAlbum } from "react-icons/bi";
import { GiMicrophone } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { MdQueueMusic } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Buttons from './Buttons';
import Recently from './Recently';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <main className='min-h-screen'>
            <section className='container overflow-y-hidden'>
                <div className='flex items-center mt-2 gap-2 h-12'>
                    <div className='flex items-center justify-center h-full neoM-buttons cursor-pointer basis-[15%]'><IoReorderThreeOutline className="size-8" /></div>
                    <div className='flex items-center gap-2 justify-between h-full px-3 basis-[85%] neoM-bg ' >
                        <input className='bg-primary outline-none placeholder:text-red-400/65 text-red-400/65' placeholder='Search songs...' type="text" />
                        <div className='cursor-pointer'><CiSearch className='size-6' /></div>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-8 mt-9 mb-5'>
                    <Link to="/songs"><Buttons icon={<IoMdMusicalNotes />} title="Songs" /></Link>
                    <Link to="/artists"><Buttons icon={<GiMicrophone />} title="Artist" /></Link>
                    <Link to="/album"><Buttons icon={<BiAlbum />} title="Album" /></Link>
                    <Buttons icon={<IoFolderOpenOutline />} title="Folder" />
                </div>

                <Link to="songs/recentlies" className='grid grid-cols-1 neoM-buttons cursor-pointer p-3 h-24'>
                    <div><MdQueueMusic className='size-9' /></div>
                    <div className='flex items-center justify-between h-4/5 text-[18px]'>
                        <p>Recently Added</p>
                        <p>21</p>
                    </div>
                </Link>

                <div className='grid grid-cols-2 ch:cursor-pointer gap-6 mt-5 h-24'>
                    <Link to="songs/playlist" className='neoM-buttons p-2'>
                        <div className='px-1'><FaHeart className='size-8' /></div>
                        <div className='flex items-center justify-between h-4/5 text-[18px]'>
                            <p>Playlist</p>
                            <p>12</p>
                        </div>
                    </Link>
                    <Link to="songs/favorites" className='neoM-buttons p-2'>
                        <div className='px-1'><IoMdMusicalNotes className='size-8' /></div>
                        <div className='flex items-center justify-between h-4/5 text-[18px]'>
                            <p>Favorite</p>
                            <p>32</p>
                        </div>
                    </Link>
                </div>

                <Recently />
            </section>
        </main>
    )
}