import { useContext, useState } from "react"
import Song from "./Song"
import { StateDispatcher, States } from "../../ReducerAndContexts"

export default function Recently() {

    const { recentlyPlayedSongs } = useContext(States)

    return (
        <>
            <h4 className='text-2xl pt-12 pb-6'>Recently Played</h4>
            <div className='flex flex-col gap-3'>
                {
                    [...recentlyPlayedSongs].reverse().map(song => <Song key={song.id} {...song} />)
                }
            </div>
        </>
    )
}