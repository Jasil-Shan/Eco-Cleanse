import { useEffect, useState } from 'react'
import earth from './assets/earth.jpg'
import { useNavigate, Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { authUser, userLogin } from '../../services/userApi'
import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { setUserDetails } from '../../redux/features/userSlice'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { motion } from "framer-motion"
import { loginValidationSchema } from '../../utils/validation'



const UserLogin = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        authUser().then((response) => {
            if (response?.data?.status)
                navigate('/')
        })
    }, [])

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const dispatch = useDispatch()

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: loginValidationSchema,

        onSubmit: async (values) => {
            try {
                const { data } = await userLogin(values)
                if (!data) toast.error('Internal server error', {
                    position: 'top-center'
                })
                if (data?.login) {

                    localStorage.setItem('UserJwtkey', data?.token)

                    dispatch(
                        setUserDetails({
                            name: data.user.name,
                            id: data.user._id,
                            email: data.user.email,
                            mobile: data.user.mobile,
                            address: data.user.address,
                        })
                    )
                    navigate("/")
                } else {
                    toast.error(data?.message, {
                        position: "top-center"
                    })
                }
            } catch (error) {
                console.log(error)
                toast.error('Internal server error', {
                    position: 'top-center'
                })
            }

        },
    })



    return (

        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <span className='self-start'> <Link to={'/'}> <AiOutlineArrowLeft size={22} /></Link></span>
                    <div className="md:w-1/2 px-14">
                        <h2 className='font-bold text-3xl text-[#002D74]'>Login</h2>
                        <p className='text-sm mt-4 text-[#002D74]'>Welcome Back!</p>

                        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                            <input className='p-2 mt-8 rounded-xl border' onChange={formik.handleChange} type="email" name="email" placeholder='Email' id="email" required />
                            {formik.touched.email && formik.errors.email ? (<div className='text-red-500' >{formik.errors.email}</div>
                            ) : null}
                            <div className="relative">
                                <input className='p-2  rounded-xl border w-full' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Password' required />
                                <button type='button' onClick={handleTogglePassword}> {!showPassword ? <AiFillEye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" /> : <AiFillEyeInvisible className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />} </button>
                            </div>
                            {formik.touched.password && formik.errors.password ? (<div className='text-red-500' >{formik.errors.password}</div>
                            ) : null}
                            <button className='bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300' type="submit">Login</button>
                        </form>
                        <div className='mt-10 grid-cols-3 items-center text-gray-500'>
                            <hr className=' text-gray-500' />
                            <p className='text-center text-sm'>OR</p>
                            <hr className=' text-gray-500' />
                        </div>

                        <button className='hover:scale-105 duration-300 bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm font-semibold'><svg
                            className="mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="25px"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>Login with Google</button>
                        {/* <p className='mt-5 text-xs border-b py-4'>Forget your password</p> */}

                        <div className='mt-3 text-xs flex justify-between items-center'>
                            <p>Not a member yet !?</p>
                            <Link to={'/signup'}><p className='hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl'>Register</p></Link>
                        </div>

                    </div>

                    <div className="w-1/2 md:block hidden">
                        <img className=' rounded-2xl' src={earth} alt="" />
                    </div>
                </div>
            </motion.div >
        </section >

    )
}

export default UserLogin