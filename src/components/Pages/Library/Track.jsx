import React, { useContext, useState } from 'react'
import { IoTriangle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FiMusic } from "react-icons/fi";
import { StateDispatcher, States, musicUrl } from '../../ReducerAndContexts';
import { FaDownload } from "react-icons/fa6";
import { MdPlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { mainUserData } from '../../ReducerAndContexts';
import { supabase } from '../../../client';
import Toast from '../../Toast';
import { getUserInfo, tagRemover } from '../../../utils';

export default function Track(data) {

    const [showDetails, setShowDetails] = useState(false)
    const { toastData, userSongsStorage, userData, currentSong, isPlaying, like, share } = useContext(States)
    const dispatch = useContext(StateDispatcher)
    const { cover, id, name, artistname, duration, favorite } = data

    const palyerHandler = () => { dispatch({ type: "changeCurrent", payload: [...userSongsStorage].findIndex(song => song.name == name) }) }

    const updater = () => { data.onUpdater(id) }

    const songLikeToggler = async () => {
        await like("favorite", name)
        setShowDetails(false)
    }

    const deleteHandler = async () => {
        const updatedData = [...mainUserData.songs].filter(song => song.id !== id)
        // make it separate later
        try {
            const { data, error } = await supabase.storage.from("users").remove(userData[0].user.email + `/${name}`)
            if (error) throw new Error(error)

            const { updatedSongsData, updatedSongsError } = await supabase.auth.updateUser({ data: { songs: updatedData } })
            if (updatedSongsError) throw new Error(updatedSongsError)

            dispatch({ type: "updater" })
            dispatch({
                type: "toastOn",
                text: "Music removed successfully !",
                status: 1
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 3000);
            updater()
        } catch (error) {
            console.log(error);
            dispatch({
                type: "toastOn",
                text: "Check your internet connection !",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);
        }
    }

    const musicDownloadHandler = async () => {
        try {
            const { data, error } = await supabase.storage.from("users").download(getUserInfo().user.email + "/" + name);
            if (error) throw new Error(error)
            downloadFile(data, name);

            dispatch({
                type: "toastOn",
                text: "Download started (:",
                status: 1
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);
        } catch (error) {
            dispatch({
                type: "toastOn",
                text: "Please check your connection !",
                status: 0
            })
            setTimeout(() => dispatch({ type: "toastOff" }), 2000);
        }
        setShowDetails(false)
    };

    const downloadFile = (musicBlob, fileName) => {
        const blobUrl = URL.createObjectURL(musicBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    };

    return (
        <div className='flex items-center gap-3'>
            <Toast text={toastData.text} status={toastData.status} />
            <div onClick={() => setShowDetails(false)} className={` ${showDetails ? "z-40 visible" : " invisible z-0"} fixed z-30 inset-0`}></div>
            {
                cover ?
                    <img className='flex-1 shrink-0 size-14 rounded-sm object-cover aspect-square' src={cover} alt="img" />
                    :
                    <div className='flex duration-300'><FiMusic className='size-[34px] p-1' /></div>
            }

            <div onClick={palyerHandler} className='flex-[7] text-sm text-gray-200/50 cursor-pointer'>
                <h3 className='font-bold text-md text-primaryWhite line-clamp-1 max-w-[210px] ]'>{tagRemover(name) || "?"}</h3>
                <p className='text-sm'>{artistname || "?"}</p>
                <div className='flex gap-2 items-center text-xs'>
                    {
                        (currentSong?.name == name && isPlaying) ?
                            <p className='flex items-center text-red-400'>Now Playing</p>
                            :
                            <IoTriangle className='rotate-90 size-[10px]' />
                    }

                    <p>{currentSong?.duration || "00:00"}</p>
                </div>
            </div>
            <div onClick={() => setShowDetails(true)} className='flex-[1/2] active:bg-black/25 duration-200 relative aspect-square rounded-full'>
                <PiDotsThreeVerticalBold className='size-[34px] p-1 z-0 cursor-pointer' />
                <div className={`inset-0 -left-[185px] z-40 ${showDetails ? "absolute" : "hidden"} neoM-bg h-36 p-4 -my-4 z-0`}>
                    <ul className='space-y-2 ch:flex ch:items-center ch:gap-2 ch:justify-between ch:cursor-pointer ch:duration-200 ch:opacity-70 ch-hover:opacity-100'>
                        <li onClick={songLikeToggler}>{favorite ? "Remove from" : "Add to"} playlist <MdPlaylistAdd className='shrink-0' /></li>
                        <li onClick={musicDownloadHandler}>Download <FaDownload /></li>
                        <li onClick={() => share(musicUrl)}>Share <IoMdShare /></li>
                        <li className='text-primaryOrange ' onClick={deleteHandler}>Delete <MdDelete /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
