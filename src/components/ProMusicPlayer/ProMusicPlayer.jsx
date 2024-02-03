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

export default function ProMusicPlayer() {
    return (
        <section onClick={() => alert("Full version of this music palyer will be available soon(:")} className='container bg-[#2C2F33] text-[#DFDFDF]'>
            <div className='flex items-center gap-2 h-12'>
                <div className='flex items-center justify-center h-full neoM-buttons cursor-pointer flex-1'><IoReorderThreeOutline className="size-8" /></div>
                <div className='flex items-center gap-2 justify-between h-full px-3 flex-[5] neoM-bg ' >
                    <input className='bg-transparent outline-none placeholder:text-red-400/65  text-red-400/65' placeholder='Search songs...' type="text" />
                    <div className='cursor-pointer'><CiSearch className='size-6' /></div>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-8 mt-9 mb-5'>
                <Buttons icon={<IoMdMusicalNotes />} title="Songs" />
                <Buttons icon={<GiMicrophone />} title="Artist" />
                <Buttons icon={<BiAlbum />} title="Album" />
                <Buttons icon={<IoFolderOpenOutline />} title="Folder" />
            </div>

            <div className='grid grid-cols-1 neoM-buttons cursor-pointer p-3 h-24'>
                <div><MdQueueMusic className='size-9' /></div>
                <div className='flex items-center justify-between h-4/5 text-[18px]'>
                    <p>Recently Added</p>
                    <p>21</p>
                </div>
            </div>

            <div className='grid grid-cols-2 ch:cursor-pointer gap-6 mt-5 h-24'>
                <div className='neoM-buttons p-2'>
                    <div className='px-1'><FaHeart className='size-8' /></div>
                    <div className='flex items-center justify-between h-4/5 text-[18px]'>
                        <p>Playlist</p>
                        <p>12</p>
                    </div>
                </div>
                <div className='neoM-buttons p-2'>
                    <div className='px-1'><IoMdMusicalNotes className='size-8' /></div>
                    <div className='flex items-center justify-between h-4/5 text-[18px]'>
                        <p>Favorite</p>
                        <p>32</p>
                    </div>
                </div>
            </div>

            <Recently />
        </section>
    )
}