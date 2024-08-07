import React, { useContext, useLayoutEffect, useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { StateDispatcher, States } from '../components/ReducerAndContexts';
import Toast from '../components/Toast';

export default function SignUp() {

    const { toastData, isLogin } = useContext(States)
    const dispatch = useContext(StateDispatcher)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const [isSubmitting, setIsSubmitting] = useState("")

    useLayoutEffect(() => { if (isLogin) navigate('/') }, [isLogin])

    const changeHandler = ({ e, type }) => setFormData({ ...formData, [type]: e.target.value })

    const submitHandler = async e => {

        setIsSubmitting("submmiting")
        e.preventDefault()

        if (!formData.email?.trim().length || !formData.password?.trim().length || !formData.name?.trim().length) {

            dispatch({
                type: "toastOn",
                text: "Fill all the fields first",
                status: 0
            })

            setTimeout(() => {
                dispatch({ type: "toastOff" })
                setIsSubmitting("")
            }, 2000);

            return;
        }

        try {

            const { data: defaultMusics, error: defaultMusicsError } = await supabase.storage.from('default-musics').list()

            const defaultSongsUpdate = defaultMusics
                .filter(songs => songs.name !== '.emptyFolderPlaceholder')
                .map(music => ({ ...music, ['isDefault']: true }))

            if (defaultMusicsError) throw new Error('fetch failed')

            const userData = {
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        songs: [...defaultSongsUpdate],
                        username: formData.name,
                        counter: 0
                    },
                },
            }

            const { data, error } = await supabase.auth.signUp(userData)
            if (error) throw new Error(error);

            setFormData({ email: "", name: "", password: "" })

            dispatch({
                type: "toastOn",
                text: "You signed up successfully",
                status: 1
            })

            setTimeout(() => {
                dispatch({ type: "toastOff" })
                setIsSubmitting("")
                navigate("/")
                location.reload()
            }, 2000);

        } catch (error) {
            let errorMessage = error.toString().toLowerCase()

            if (errorMessage.includes("characters")) {
                errorMessage = "Password should be at least 6 characters."
            } else if (errorMessage.includes("valid password")) {
                errorMessage = "Signup requires a valid password"
            } else if (errorMessage.includes("format") || errorMessage.includes("provide")) {
                errorMessage = "Please enter a valid email (:"
            } else if (errorMessage.includes("already registered")) {
                errorMessage = "This username or email already exist ):"
            } else if (errorMessage.includes("fetch")) {
                errorMessage = "Please check your connection!"
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
                <h2 className='text-3xl mb-8 font-anta'>SIGN UP</h2>
                <form className='space-y-4' onSubmit={submitHandler}>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.name} onChange={e => changeHandler({ e, type: "name" })} className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Name' type="text" />
                        <div className='cursor-pointer'><FaUserAlt className='size-6 flex-[6]' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.email} onChange={e => changeHandler({ e, type: "email" })} className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Email' type="text" />
                        <div className='cursor-pointer'><HiOutlineMail className='size-6 flex-[6]' /></div>
                    </label>
                    <label className='flex items-center gap-2 justify-between h-14 px-3 basis-[85%] neoM-bg ' >
                        <input value={formData.password} onChange={e => changeHandler({ e, type: "password" })} className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' placeholder='Password' type="text" />
                        <div className='cursor-pointer'><FaLock className='size-6 flex-[6]' /></div>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2 justify-between rounded-xl h-14 px-3 basis-[85%] neoM-buttons ' >
                        <input disabled={isSubmitting == "submmiting"} value="Submit" className='bg-primary flex-1 text-[17px] outline-none placeholder:text-red-400/65 text-red-400/65 placeholder:tracking-wide' type="submit" />
                        <div className='cursor-pointer'><MdDownloadDone className='size-6 flex-[6]' /></div>
                    </label>
                    <div className='text-[14px]'>Already have account? <Link replace={true} to="/login"><span className='underline text-red-400/65'>Login here</span></Link></div>
                </form>
            </div>
        </section>
    )
}
