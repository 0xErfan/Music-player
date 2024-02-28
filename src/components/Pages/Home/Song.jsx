import { VscDebugStart } from "react-icons/vsc";
import { GiPauseButton } from "react-icons/gi";
import { getUserInfo, tagRemover } from "../../../utils";
import { StateDispatcher, States } from "../../ReducerAndContexts";
import { useContext } from "react";

export default function Song({ name }) {

    const { isPlaying, currentSong } = useContext(States)
    const dispatch = useContext(StateDispatcher)

    return (
        <div className='flex items-center gap-2'>
            <div className='h-12 neoM-buttons duration-200 transition-all overflow-hidden flex-[1]'><img className='size-full object-cover' src="./images/city.jpg" /></div>
            <div className="neoM-bg flex cursor-pointer items-center justify-between gap-2 flex-[6] h-12 p-2 z-10">

                <div
                    onClick={() => dispatch({ type: "changeCurrent", payload: getUserInfo().user.user_metadata.songs.findIndex(song => song.name == name) })}
                >
                    <p className='w-full max-w-5/6 line-clamp-1'>{tagRemover(name) || "Loading..."}</p>
                </div>
                <div className='bg-[#DFDFDF] rounded-full p-[3px]'>
                    {
                        isPlaying && currentSong?.name == name ? <GiPauseButton onClick={() => dispatch({ type: "pause" })} className='size-6 z-20 p-1 text-[#2C2F33]' />
                            :
                            <VscDebugStart
                                className='size-6 p-px text-[#2C2F33]' />
                    }
                </div>
            </div>
        </div>
    )
}