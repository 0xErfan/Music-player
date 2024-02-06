import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Login() {

    const [formData, setFormData] = useState({
        uesrname: "",
        password: "",
    })

    const [isSubmitting, setIsSubmitting] = useState("")
    const changeHandler = ({ e, type }) => setFormData({ ...formData, [type]: e.target.value })
    const [checkbox, setCheckbox] = useState(false)
    
    const submitHandler = e => {
        setIsSubmitting("submmiting")
        e.preventDefault()

        // fetch
        setFormData({ email: "", name: "", password: "" })
        setIsSubmitting("")
    }

    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='container'>
                <h2 className='text-3xl mb-8'>LOG IN</h2>
                <form className='space-y-4' onSubmit={submitHandler}>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.name} onChange={e => changeHandler({ e, type: "uesrname" })} className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='uesrname' type="text" />
                        <div className='cursor-pointer'><FaUserAlt className='size-6' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.password} onChange={e => changeHandler({ e, type: "password" })} className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Password' type="text" />
                        <div className='cursor-pointer'><FaLock className='size-6' /></div>
                    </label>
                    <label className='flex gap-2 items-center'>
                        <input checked={checkbox} onChange={() => setCheckbox(preve => !preve)} className='bg-primary rounded-xl neoM-bg size-6 p-2' type="checkbox" />
                        <p>Remember me for logins</p>
                    </label>
                    <label className='flex items-center gap-2 justify-between rounded-xl h-14 px-3 basis-[85%] neoM-buttons ' >
                        <input disabled={isSubmitting == "submmiting"} value="Submit" className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' type="submit" />
                        <div className='cursor-pointer'><MdDownloadDone className='size-6' /></div>
                    </label>
                    <div className='text-[14px]'>New friend? <Link replace={true} to="/signUp"><span className='underline text-red-400/65'>Sign up here</span></Link></div>
                </form>
            </div>
        </section>
    )
}
