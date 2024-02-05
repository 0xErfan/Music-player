import React, { useContext, useState } from 'react'
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
import Toast from '../Toast/Toast';
import { StateDispatcher, States } from '../DataContext/ReducerAndContexts';


export default function Main() {
    const dispatch = useContext(StateDispatcher)
    const [updater, setUpdater] = useState(false)

    const { allSongs, toastData } = useContext(States)

    const newFileHandler = async e => {
        // setUpdater(preve => !preve)
        const selectedFile = e.target.files[0]

        if (selectedFile.type.startsWith("audio/")) {
            const songSrc = URL.createObjectURL(selectedFile);
            const isAdded = allSongs.some(song => { if (song.name == selectedFile.name) { return true; } })

            if (isAdded) {
                dispatch({
                    type: "toastOn",
                    text: "This music already exist!",
                    status: 0
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 2000);
                return;
            } else {
                const newSong = {
                    id: allSongs.length,
                    name: selectedFile.name,
                    src: songSrc,
                    lastModifiedDate: selectedFile.lastModifiedDate
                }
                dispatch({
                    type: "newTrack",
                    payload: newSong,
                    text: "Music added!",
                    status: 1
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 3000);
                return;
            }
        }
        dispatch({
            type: "toastOn",
            text: "Please choose a file with audio format!",
            status: 0
        })
        setTimeout(() => dispatch({ type: "toastOff" }), 2000);
    }

    return (
        <main className='min-h-screen'>
            <Toast text={toastData.text} status={toastData.status} />
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
                    <Link to="/albums"><Buttons icon={<BiAlbum />} title="Album" /></Link>
                    <label htmlFor="fileUploader">
                        <Buttons icon={<IoFolderOpenOutline />} title="Folder" />
                        <input onChange={newFileHandler} className='hidden' id='fileUploader' type="file" />
                    </label>
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