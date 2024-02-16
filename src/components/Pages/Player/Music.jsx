import Controller from './Controller';
import { States } from '../../ReducerAndContexts/ReducerAndContexts';
import { useContext } from 'react';
import { FiMusic } from "react-icons/fi";
export default function Music() {

    const { currentSong } = useContext(States)

    return (
        <>
            <div className='neoM-buttons m-auto rounded-xl my-14 max-w-[80%] aspect-square border-[10px] overflow-hidden border-primary'>
                {
                    currentSong?.cover ? <img className='object-cover size-full rounded-[8px]' src="images/city.jpg" alt="city" />
                        :
                        <FiMusic className="flex items-center size-full p-20 neoM-bg rounded-[8px]" />
                }
            </div>
            <div className='text-center space-y-1 mb-6'>
                <h3 className='text-xl min-h-14 line-clamp-2'>{currentSong ? currentSong.name : "?"}</h3>
            </div>
            <Controller {...currentSong} />
        </>
    )
}