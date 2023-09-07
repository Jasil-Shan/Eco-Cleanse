import React, { useState } from 'react'
import work from './assets/work.jpg'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";





const WorkerLogin = () => {
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit:async (values) => {
            try {
                console.log('hbhvhgv');
                const { data } = await axios.post('/worker/login', {...values})
                if(data.blocked){
                  return toast.error(data.message, {
                        position: "top-center",
                    })
                }
                if (data.error) {
                    toast.error(data.message, {
                        position: "top-center",
                    })
                } else {
                    localStorage.setItem('WorkerJwtkey', data.token)
                    navigate("/worker/dashboard")
                }
            } catch (error) {

                console.log(error);
            }
        
        },
      })

    return (

         <section className="bg-black min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                <div className="md:w-1/2 px-16">
          <h2 className='font-bold text-3xl text-[#002D74]'>Login</h2>
                    <p className='text-sm mt-4 text-[#002D74]'>Welcome Back Collector!</p>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
                        <input className='p-2 mt-8 rounded-xl border' onChange={formik.handleChange} type="email" name="email" placeholder='Email' id="email" required/>
                        <div className="relative">
                        <input className='p-2  rounded-xl border w-full' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required />
                            <button type='button' onClick={handleTogglePassword}> {!showPassword ? <AiFillEye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4"/> : <AiFillEyeInvisible className="w-5 absolute top-1 right-3 translate-y-1/2 h-4"/> } </button>
                        </div>
                        <button className='bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300' type="submit">Login</button>
                    </form>
                   </div>

                <div className="w-1/2 md:block hidden">
                    <img className=' rounded-2xl' src={work} alt="" />
                </div>
      </div>
        </section>
    )
}

export default WorkerLogin