import React from 'react'
import Controller from './Controller';

export default function Music() {
    return (
        <>
            <div className='neoM-buttons m-auto rounded-xl my-14 max-w-[80%] aspect-square border-[10px] overflow-hidden border-primary'>
                <img className='object-cover size-full rounded-[8px]' src="images/city.jpg" alt="city" />
            </div>
            <div className='text-center space-y-1 mb-6'>
                <h3 className='text-xl'>So Much Pain</h3>
                <p className='text-sm'>ft Ryan Joans</p>
            </div>
            <Controller />
        </>
    )
}
