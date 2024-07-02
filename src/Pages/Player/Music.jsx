import Controller from './Controller';
import { States } from '../../components/ReducerAndContexts';
import { useContext } from 'react';
import { FiMusic } from "react-icons/fi";
import { tagRemover } from '../../utils';

export default function Music() {

    const { currentSong } = useContext(States)

    return (
        <>
            <div className='flex flex-col neoM-buttons m-auto rounded-xl my-10 max-w-[65%] aspect-square border-[10px] overflow-hidden border-primary'>
                {
                    currentSong?.cover ? <img className='object-cover size-full rounded-[8px]' src="images/city.jpg" alt="city" />
                        :
                        <FiMusic className="flex items-center size-full shrink-0 p-12 neoM-bg rounded-[8px]" />
                }
            </div>

            <div className='text-center space-y-1 mb-2'>
                <h3 className='text-xl min-h-14 line-clamp-2'>{currentSong ? tagRemover(currentSong.name) : "Loading..."}</h3>
            </div>
            
            <Controller {...currentSong} />
        </>
    )
}