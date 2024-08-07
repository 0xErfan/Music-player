import Music from './Music';
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Player() {

    const navigate = useNavigate()

    return (
        <>
            <section className='bg-primary'>

                <div className='container'>

                    <div>
                        <div className='flex items-center justify-between pt-6 cursor-pointer'>
                            <IoChevronBackOutline onClick={() => navigate(-1)} className='size-12 p-3 neoM-buttons' />
                        </div>
                    </div>

                    <Music />
                    
                </div>

            </section>
        </>
    )
}
