import Music from './Music';
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Player() {

    return (
        <section className='bg-primary h-screen'>
            <div className='container'>
                <div>
                    <div className='flex items-center justify-between pt-6 cursor-pointer'>
                        <IoChevronBackOutline onClick={() => history.back()} className='size-12 p-3 neoM-buttons' />
                        <HiOutlineDotsVertical className='size-12 p-3 neoM-buttons' />
                    </div>
                </div>
                <Music/>
            </div>
        </section>
    )
}
