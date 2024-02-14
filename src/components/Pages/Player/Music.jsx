import Controller from './Controller';
import { States } from '../../ReducerAndContexts/ReducerAndContexts';
import { useContext } from 'react';

export default function Music() {

    const { currentSong } = useContext(States)

    return (
        <>
            <div className='neoM-buttons m-auto rounded-xl my-14 max-w-[80%] aspect-square border-[10px] overflow-hidden border-primary'>
                <img className='object-cover size-full rounded-[8px]' src="images/city.jpg" alt="city" />
            </div>
            <div className='text-center space-y-1 mb-6'>
                <h3 className='text-xl min-h-14 line-clamp-2'>{currentSong ? currentSong.name : "?"}</h3>
            </div>
            <Controller {...currentSong} />
        </>
    )
}