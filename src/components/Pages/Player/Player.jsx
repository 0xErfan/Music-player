import Music from './Music';
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

export default function Player() {

    const navigate = useNavigate()

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
