import Music from './Music';
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { supabase } from '../../../client';
import { States } from '../../ReducerAndContexts/ReducerAndContexts';

export default function Player() {

    const navigate = useNavigate()
    const { userData, currentSong, isPlaying } = useContext(States)

    let audio = useRef(new Audio());

    const fetchMusic = async () => {
        if (userData && currentSong) {
            const folderPath = userData[0].user.email
            const { data, error } = await supabase
                .storage
                .from('users')
                .list(folderPath, {
                    limit: 1000,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                })
            const musicUrl = `https://inbskwhewximhtmsxqxi.supabase.co/storage/v1/object/public/users/eftekharierfan5555555555@gmail.com/Yeezy-hitava1-Poor22i.mp3`
            audio.current.src = musicUrl
        }
    }

    useEffect(() => {
        fetchMusic()
    }, [currentSong])
    
    useEffect(() => {
        isPlaying ? audio.current.play() : audio.current.pause()
        console.log("hi");
    }, [currentSong, isPlaying])

    return (
        <section className='bg-primary h-screen'>
            <div className='container'>
                <div>
                    <div className='flex items-center justify-between pt-6 cursor-pointer'>
                        <IoChevronBackOutline onClick={() => navigate(-1, { replace: true })} className='size-12 p-3 neoM-buttons' />
                        <HiOutlineDotsVertical className='size-12 p-3 neoM-buttons' />
                    </div>
                </div>
                <Music />
            </div>
        </section>
    )
}
