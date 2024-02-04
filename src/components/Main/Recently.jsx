import Song from "./Song"

export default function Recently() {
    return (
        <>
            <h4 className='text-2xl pt-12 pb-6'>Recently Played</h4>
            <div className='flex flex-col gap-3'>
                <Song />
            </div>
        </>
    )
}