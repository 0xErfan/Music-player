export default function Buttons({ icon, title }) {
    return (
        <div className='flex flex-col'>
            <div className='neoM-buttons flex items-center justify-center cursor-pointer *:size-8 *:h-14'>{icon}</div>
            <p className='mt-2 text-center'>{title}</p>
        </div>
    )
}