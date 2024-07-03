import React, { useContext, useState, useRef } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BiAlbum } from "react-icons/bi";
import { GiMicrophone } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { MdQueueMusic } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import Buttons from './Buttons';
import Recently from './Recently';
import { Link, useNavigate } from 'react-router-dom';
import { States, mainUserData, StateDispatcher } from '../../components/ReducerAndContexts';
import { supabase } from '../../client';
import { getUserInfo, isLogin, padStarter } from '../../utils';
import Loader from '../../components/Loader';

export default function Main() {

    const dispatch = useContext(StateDispatcher)
    const { userData, isLoaded } = useContext(States)
    const [sideMenuShow, setSideMenuShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const inputRef = useRef()

    let userSongs = userData?.length ? userData[0].user.user_metadata.songs : null

    const newSongSearchHandler = () => inputRef.current.value.trim().length && navigate(`/search/${inputRef.current.value}`)

    const newSongHandler = async e => {

        if (isLoading) return;

        const selectedFile = e.target.files[0]
        if (!userData[0]) return

        if (selectedFile && selectedFile.type.startsWith("audio/")) {

            const isAdded = userData[0].user.user_metadata.songs.some(song => { if (song.name == selectedFile.name) return true })

            if (isAdded) {
                dispatch({
                    type: "toastOn",
                    text: "This music already exist !",
                    status: 0,
                })
                setTimeout(() => dispatch({ type: "toastOff" }), 2000);
                e.target.value = ""  //reest the input file value to be able check next user selection via onchange

                return;
            } else {

                setIsLoading(true)

                const newSong = {
                    id: mainUserData.counter,
                    name: selectedFile.name,
                    lastModifiedDate: selectedFile.lastModifiedDate,
                    liked: false,
                    favorite: false
                }

                try {

                    dispatch({
                        type: "toastOn",
                        text: "Uploading song, please wait...",
                        status: 1,
                        loader: 1
                    })

                    const { uploadData, uploadError } = await supabase.storage
                        .from('users')
                        .upload(userData[0].user.email + "/" + selectedFile.name, selectedFile)

                    if (uploadError) throw new Error(uploadError)

                    const musicUrl = `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/users/${getUserInfo().user.email}/${newSong.name}`;
                    let audio = new Audio();
                    audio.src = musicUrl;

                    audio.addEventListener('loadedmetadata', async () => {

                        newSong.duration = (padStarter(Math.floor(audio.duration / 60))) + ":" + (padStarter(Math.floor(audio.duration % 60)))

                        const { data, error } = await supabase.auth.updateUser({
                            data: { songs: [...userData[0].user.user_metadata.songs, newSong], counter: mainUserData.counter + 1 }
                        })
                        if (error) throw new Error(error)


                        dispatch({ type: "updater" })
                        dispatch({
                            type: "toastOn",
                            text: "Music added successfully !",
                            status: 1
                        })
                        dispatch({ type: "filteredSongsUpdater" })
                        e.target.value = ""
                        setTimeout(() => dispatch({ type: "toastOff" }), 1000);
                    });
                    return
                } catch (err) {
                    console.log(err);
                    const { data, error } = await supabase.storage.from("users").remove(getUserInfo().user.email + `/${selectedFile.name}`)
                    dispatch({
                        type: "toastOn",
                        text: "Check your internet connection !",
                        status: 0
                    })
                    e.target.value = ""
                    setTimeout(() => dispatch({ type: "toastOff" }), 2000);
                    return;
                }
                finally { setIsLoading(false) }
            }
        }
        dispatch({
            type: "toastOn",
            text: "Please choose a file with audio format!",
            status: 0,
        })
        e.target.value = ""
        setTimeout(() => dispatch({ type: "toastOff" }), 2800);
    }

    return (
        <main className='min-h-screen'>

            {
                !isLoaded ? <Loader /> : null
            }

            <section className='container relative overflow-y-hidden'>

                <div onClick={() => setSideMenuShow(false)} className={` ${sideMenuShow ? "fixed" : "hidden"} inset-0 z-40`}></div>

                <div className={`fixed h-screen top-0 bottom-0 duration-200 ${sideMenuShow ? "left-0" : "-left-[250px]"} neoM-bg z-40`}>

                    <div className='flex items-center justify-between text-2xl px-4 mt-3 w-[250px]'>
                        <h2 className='font-bold'>Pro music player</h2>
                        <IoClose
                            onClick={() => setSideMenuShow(false)}
                            className='cursor-pointer'
                        />
                    </div>

                    <div className='flex justify-center items-center gap-1 pt-8'>Any/Many bugs? <a target='_blank' href='https://t.me/0oErfan' className='underline text-primaryOrange'>Let me know</a></div>

                    <div className='fixed bottom-0 w-full max-w-[250px] text-nowrap neoM-bg py-3 px-10 space-y-4'>

                        Created by <span className='text-primaryOrange'>0xErfan</span>

                        <div className='flex items-center justify-evenly ch:ch:size-9 ch:ch:border ch:ch:border-primaryWhite/20 ch:ch:p-2 ch:ch:rounded-full'>
                            <a target='_blank' href="https://www.instagram.com/libanogs.so"><FaInstagram /></a>
                            <a target='_blank' href="https://t.me/0oErfan"><FaTelegramPlane /></a>
                            <a target='_blank' href="https://github.com/0xErfan"><FaGithub /></a>
                        </div>
                    </div>

                </div>

                <div className='flex items-center mt-2 gap-2 h-12'>

                    <div onClick={() => setSideMenuShow(true)} className='flex items-center justify-center h-full neoM-buttons duration-200 transition-all cursor-pointer basis-[15%]'><IoReorderThreeOutline className="size-8" /></div>

                    <div className='flex items-center gap-2 justify-between h-full px-3 basis-[85%] neoM-bg ' >
                        <input ref={inputRef} onKeyDown={e => e.key == "Enter" && newSongSearchHandler(e)} className='bg-primary flex-[7] outline-none placeholder:text-red-400/65 text-red-400/65' placeholder='Search new songs...' type="text" />
                        <div onClick={newSongSearchHandler} className='cursor-pointer'><CiSearch className='size-6' /></div>
                    </div>

                </div>

                <div className='grid grid-cols-4 gap-8 mt-9 mb-5'>

                    <Link to="/songs"><Buttons icon={<IoMdMusicalNotes />} title="Songs" /></Link>
                    <Link to="/artists"><Buttons icon={<GiMicrophone />} title="Artist" /></Link>
                    <Link to="/albums"><Buttons icon={<BiAlbum />} title="Album" /></Link>

                    <label htmlFor="fileUploader">
                        <Buttons
                            icon={<IoFolderOpenOutline />}
                            opacity={!isLogin() ? 1 : 0}
                            title="Add"
                        />
                        {isLogin() && <input onChange={newSongHandler} className='hidden' id='fileUploader' type="file" />}
                    </label>

                </div>

                <Link to="songs/recentlies" className='grid grid-cols-1 neoM-buttons duration-200 transition-all cursor-pointer p-3 h-24'>
                    <div><MdQueueMusic className='size-9' /></div>
                    <div className='flex items-center justify-between h-4/5 text-[18px]'>
                        <p>Recently Added</p>
                        <p>{userSongs?.length || 0}</p>
                    </div>
                </Link>

                <div className='grid grid-cols-2 ch:cursor-pointer gap-6 mt-5 h-24'>
                    <Link to="songs/playlist" className='neoM-buttons duration-200 transition-all p-2'>
                        <div className='px-1'><IoMdMusicalNotes className='size-8' /></div>
                        <div className='flex items-center justify-between h-4/5 text-[18px]'>
                            <p>Playlist</p>
                            <p>{userSongs?.filter(song => song.favorite).length || 0}</p>
                        </div>
                    </Link>

                    <Link to="songs/favorites" className='neoM-buttons duration-200 transition-all p-2'>
                        <div className='px-1'><FaHeart className='size-8' /></div>
                        <div className='flex items-center justify-between h-4/5 text-[18px]'>
                            <p>Favorite</p>
                            <p>{userSongs?.filter(song => song.liked).length || 0}</p>
                        </div>
                    </Link>
                </div>

                <Recently />
                
            </section>
        </main>
    )
}