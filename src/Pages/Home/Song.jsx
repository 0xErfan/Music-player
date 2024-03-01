import { VscDebugStart } from "react-icons/vsc";
import { GiPauseButton } from "react-icons/gi";
import { getUserInfo, tagRemover } from "../../utils";
import { StateDispatcher, States } from "../../components/ReducerAndContexts";
import { useContext } from "react";

export default function Song({ name }) {

    const { isPlaying, currentSong } = useContext(States)
    const dispatch = useContext(StateDispatcher)

    return (
        <div className='flex items-center gap-2'>
            <div className='h-12 flex items-center justify-center shrink-0 neoM-buttons duration-200 transition-all overflow-hidden flex-[1]'>  <svg
                className="  size-full bg-primary p-[8px]"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
            >
                <rect id="view-box" width={24} height={24} fill="none" />
                <path
                    id="Shape"
                    d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z"
                    transform="translate(1.568 2.25)"
                    fill="#DFDFDF"
                />
            </svg></div>
            <div className="neoM-bg flex cursor-pointer items-center justify-between gap-2 flex-[6] h-12 p-2 z-10">

                <div onClick={() => dispatch({ type: "changeCurrent", payload: getUserInfo().user.user_metadata.songs.findIndex(song => song.name == name) })}>
                    <p className='w-full max-w-5/6 line-clamp-1'>{tagRemover(name) || "Loading..."}</p>
                </div>
                <div className='bg-[#DFDFDF] rounded-full p-[3px]'>
                    {
                        isPlaying && currentSong?.name == name ? <GiPauseButton onClick={() => dispatch({ type: "pause" })} className='size-6 z-20 p-1 text-[#2C2F33]' />
                            :
                            <VscDebugStart onClick={() => dispatch({ type: "changeCurrent", payload: getUserInfo().user.user_metadata.songs.findIndex(song => song.name == name) })}
                                className='size-6 p-px text-[#2C2F33]' />
                    }
                </div>
            </div>
        </div>
    )
}