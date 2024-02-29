export default function Buttons({ icon, title, opacity }) {
    return (
        <div className={`flex flex-col ${opacity && "opacity-40"}`}>
            <div className='neoM-buttons duration-200 transition-all flex items-center justify-center cursor-pointer *:size-8 *:h-14'>{icon}</div>
            {title && <p className='mt-2 text-center'>{title}</p>}
        </div>
    )
}