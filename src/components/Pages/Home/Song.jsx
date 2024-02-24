import { VscDebugStart } from "react-icons/vsc";
import { tagRemover } from "../../../utils";
export default function Song({ name }) {


    return (
        <div className='flex items-center gap-2'>
            <div className='h-12 neoM-buttons duration-200 transition-all overflow-hidden flex-[1]'><img className='size-full object-cover' src="./images/city.jpg" /></div>
            <div className='neoM-bg flex items-center justify-between gap-2 flex-[6] h-12 p-2'>
                <p className='w-full max-w-5/6 line-clamp-1'>{tagRemover(name) || "?"}</p>
                <div className='bg-[#DFDFDF] rounded-full cursor-pointer p-[3px]'><VscDebugStart className='size-6 text-[#2C2F33]' /></div>
            </div>
        </div>
    )
}