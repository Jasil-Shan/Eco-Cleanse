import React, { useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from "formik"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import iland from './assets/iland.jpg'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signupSchema } from '../../utils/validation'
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from '../../services/userApi'
import { BeatLoader } from 'react-spinners'



const UserSignup = () => {
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [locations, setLocation] = useState([])
    const [suggestions, setSuggest] = useState([])
    const [value, setValue] = useState("")
    const [place, setPlace] = useState("")
    const [loading, setLoading] = useState(false);


    const handleRetrieve = (itemLocation, place) => {
        setLocation(itemLocation)
        setPlace(place)
    }

    const handleSearch = async (e) => {
        setValue(e.target.value)
        console.log(value)

        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                value
            )}.json?access_token=pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw`
        )
        if (response.ok) {
            const { features } = await response.json()
            setSuggest(features)
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }



    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            address: '',
            password: '',
            confirmpassword: ''
        },

        validationSchema: signupSchema,

        onSubmit: async (values) => {
            try {
                setLoading(true)
                const { data } = await axios.post('/user/verify', { ...values, locations })
                const email = formik.values.email

                if (data.status) {
                    toast.success(data.message, {
                        position: "top-center"
                    })
                    navigate("/verifyMail", { state: { email } })

                } else {
                    toast.error(data.message, {
                        position: "top-center"
                    })
                }

            } catch (error) {

                toast.error("Internal Server Error", {
                    position: "top-center",

                })
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
    })

    const handleChange = (event) => {
        formik.setValues((prev) => {
            const formFields = { ...prev }
            formFields[event.target.name] = event.target.value
            return formFields
        })
    }

    const login = useGoogleLogin({

        onSuccess: (codeResponse) => {
            console.log("login with google");
            googleLogin(codeResponse)
                .then((response) => {
                    // checking user status 
                    console.log("res", response);
                    if (response.data.user.blocked) {
                        toast.error("Sorry you are Banned ..!", {
                            position: "top-center"
                        })
                    } else {
                        localStorage.setItem('UserJwtkey', data.token)

                        dispatch(
                            setUserDetails({
                                name: data.user.name,
                                id: data.user._id,
                                email: data.user.email,
                                mobile: data.user.mobile,
                                address: data.user.address,
                            })
                        )
                        // succes navigate to home page

                        navigate("/");
                    }


                }).catch((err) => {
                    toast.error("Something went wrong please reload the page", {
                        position: "top-center",
                    })
                })
        },
        onError: (error) => {
            console.log("error");
            toast.error("Login Failed", {
                position: "top-center",
            });
        }
    })

    return (
        <Formik>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl  items-center">

                    <div className="md:w-1/2  px-16">
                        <h2 className='font-bold text-3xl text-[#002D74]'>Register Here..</h2>
                        <p className='text-sm mt-4 text-[#002D74]'>Lets Start Your Journey!</p>
                        {errorMessage ? <div className="text-red-500 pb-6 text-center ">{errorMessage}</div> : ""}

                        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
                            <input className='p-2 mt-8 rounded-xl border' type="text" name='name' placeholder='Full Name' id='name' onChange={(e) => { handleChange(e) }}
                            />{formik.touched.name && formik.errors.name ? (<p className="text-red-500 gap-0 p-0 m-0">{formik.errors.name}</p>
                                ) : null}

                            <input className='p-2 rounded-xl border' type="email" name="email" placeholder='Email' id="email" onChange={(e) => { handleChange(e) }} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='text-red-500 p-0' >{formik.errors.email}</div>
                            ) : null}
                            <input className='p-2 rounded-xl border' type="number" name="mobile" placeholder='Mobile Number' id="mobile" onChange={(e) => { handleChange(e) }} />
                            {
                                formik.touched.mobile && formik.errors.mobile ? (
                                    <div className="text-red-500"> {formik.errors.mobile} </div>
                                ) : null}
                            <textarea className='p-2 rounded-xl border' placeholder='Address' name="address" id="address" cols="30" rows="5" onChange={(e) => { handleChange(e) }}></textarea>
                            {
                                formik.touched.address && formik.errors.address ? (
                                    <div className="text-red-500"> {formik.errors.address} </div>
                                ) : null}
                            <div>
                                <input className='p-2 rounded-xl border w-full' type="text" name="location" placeholder='Select Your Location' id="location" onChange={handleSearch}
                                    value={place ? place : value}
                                    onFocus={() => setPlace('')}
                                    required />
                                <ul className=" absolute z-30 w-96 py-4  ">
                                    {!place &&
                                        suggestions.map((item, index) => {
                                            return <li key={index} onClick={() => handleRetrieve(item.geometry.coordinates, item.place_name)} className="text-start bg-white rounded-md pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                                <svg
                                                    className="stroke-current absolute w-4 h-4 left-2 top-2"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                {item.place_name}
                                            </li>
                                        })}
                                </ul>
                            </div>


                            <div className="relative">
                                <input className='p-2  rounded-xl border w-full' type={showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Password' onChange={(e) => { handleChange(e) }} />
                                <button type='button' onClick={handleTogglePassword}> {!showPassword ? <AiFillEye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" /> : <AiFillEyeInvisible className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />} </button>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-red-500'>{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className='relative'>
                                <input className='p-2  rounded-xl border w-full' type={showPassword ? 'text' : 'password'} name='confirmpassword' id='confirmpassword' placeholder='Confirm Password' onChange={(e) => { handleChange(e) }} />
                                <button type='button' onClick={handleTogglePassword}> {!showPassword ? <AiFillEye className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" /> : <AiFillEyeInvisible className="w-5 absolute top-1 right-3 translate-y-1/2 h-4" />} </button>
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <div className='text-red-500'>{formik.errors.confirmpassword}</div>
                                ) : null}
                            </div>
                            {loading ? (
                                <button className='bg-[#002D74] rounded-xl py-2 mt-2 text-center text-white' disabled >
                                        <BeatLoader color="#36d7b7" />
                                </button>
                            ) : (
                                <button className='bg-[#002D74] font-semibold rounded-xl py-2 mt-2 text-white' type="submit">Sign up</button>

                            )}                        </form>
                        {/* <div className='mt-10 grid-cols-3 items-center text-gray-500'>
                            <hr className=' text-gray-500' />
                            <p className='text-center text-sm'>OR</p>
                            <hr className=' text-gray-500' />
                        </div>

                        <button onClick={login} className='hover:scale-105 duration-300 bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm font-semibold'><svg
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
                        </svg>SignUp with Google</button> */}

                        <div className='mt-3 text-xs flex justify-between items-center'>
                            <p>Already a member !?</p>
                            <Link to={'/login'}><p className='hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl'>Log in</p></Link>
                        </div>

                    </div>

                    <div className="w-1/2 h-fit md:block hidden">
                        <img className=' rounded-2xl' src={iland} alt="" />
                    </div>
                </div>
                <ToastContainer />
            </section>
        </Formik>
    )
}

export default UserSignup