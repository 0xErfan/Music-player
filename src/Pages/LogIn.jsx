import React, { useContext, useState } from 'react'
import { FaLock } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { StateDispatcher, States } from '../components/ReducerAndContexts';
import { supabase } from '../client';
import Toast from '../components/Toast';

export default function Login() {

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [isSubmitting, setIsSubmitting] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const { toastData, songIndex } = useContext(States)
    const dispatch = useContext(StateDispatcher)
    const navigate = useNavigate()

    const changeHandler = ({ e, type }) => setFormData({ ...formData, [type]: e.target.value })
    
    const submitHandler = async e => {
        setIsSubmitting("submmiting")
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) throw new Error(error);
            setFormData({ email: "", name: "", password: "" })
            dispatch({
                type: "toastOn",
                text: "You logged in successfully",
                status: 1
            })
            setTimeout(() => {
                dispatch({ type: "toastOff" })
                dispatch({ type: "updater" })
                navigate("/")
                setIsSubmitting("")
            }, 2000);
            dispatch({ type: "updater" })

        } catch (error) {
            console.log(error);
            let errorMessage = error.toString().toLowerCase()

            if (errorMessage.includes("credentials")) {
                errorMessage = "Wrong email or password"
            } else if (errorMessage.includes("fetch")) {
                errorMessage = "Check your connection and retry!"
            }
            dispatch({
                type: "toastOn",
                text: errorMessage,
                status: 0
            })
            setTimeout(() => {
                dispatch({ type: "toastOff" })
                setIsSubmitting("")
            }, 3000);
        }
    }

    return (
        <section className='flex items-center justify-center h-screen'>
            <Toast text={toastData.text} status={toastData.status} />
            <div className='container'>
                <h2 className='text-3xl mb-8 font-anta'>LOG IN</h2>
                <form className='space-y-4' onSubmit={submitHandler}>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input name='email' value={formData.email} onChange={e => changeHandler({ e, type: "email" })} className='bg-primary placeholder-shown:bg-transparent flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Email' type="text" />
                        <div className='cursor-pointer'><HiOutlineMail className='size-6 flex-[6]' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.password} onChange={e => changeHandler({ e, type: "password" })} className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Password' type="text" />
                        <div className='cursor-pointer'><FaLock className='size-6 flex-[6]' /></div>
                    </label>
                    <label className='flex gap-2 items-center'>
                        <input id='email' checked={checkbox} onChange={() => setCheckbox(preve => !preve)} className='bg-primary rounded-xl neoM-bg size-6 p-2' type="checkbox" />
                        <p>Remember me for logins</p>
                    </label>
                    <label className='flex items-center cursor-pointer ch:cursor-pointer gap-2 justify-between rounded-xl h-14 px-3 basis-[85%] neoM-buttons ' >
                        <input disabled={isSubmitting == "submmiting"} value="Submit" className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' type="submit" />
                        <div className='cursor-pointer'><MdDownloadDone className='size-6 flex-[6]' /></div>
                    </label>
                    <div className='text-[14px]'>New friend? <Link replace={true} to="/signUp"><span className='underline text-red-400/65'>Sign up here</span></Link></div>
                </form>
            </div>
        </section>
    )
}