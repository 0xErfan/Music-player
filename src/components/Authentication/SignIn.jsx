import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [isSubmitting, setIsSubmitting] = useState("")

    const changeHandler = ({ e, type }) => setFormData({ ...formData, [type]: e.target.value })

    const submitHandler = e => {
        setIsSubmitting("submmiting")
        e.preventDefault()

        // fetch
        setFormData({ email: "", name: "", password: "" })
        setIsSubmitting("submmiting")
    }

    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='container'>
                <h2 className='text-3xl mb-8'>SIGN UP</h2>
                <form className='space-y-4' onSubmit={submitHandler}>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.name} onChange={e => changeHandler({ e, type: "name" })} className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Name' type="text" />
                        <div className='cursor-pointer'><FaUserAlt className='size-6' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.email} onChange={e => changeHandler({ e, type: "email" })} className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Email' type="text" />
                        <div className='cursor-pointer'><HiOutlineMail className='size-6' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.password} onChange={e => changeHandler({ e, type: "password" })} className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Password' type="text" />
                        <div className='cursor-pointer'><FaLock className='size-6' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between rounded-xl h-14 px-3 basis-[85%] neoM-buttons ' >
                        <input disabled={isSubmitting == "submmiting"} value="Submit" className='bg-primary text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' type="submit" />
                        <div className='cursor-pointer'><MdDownloadDone className='size-6' /></div>
                    </label>
                    <div className='text-[14px]'>Already have account? <Link replace={true} to="/logIn"><span className='underline text-red-400/65'>Login here</span></Link></div>
                </form>
            </div>
        </section>
    )
}
