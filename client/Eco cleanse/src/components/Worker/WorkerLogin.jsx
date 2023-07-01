import React from 'react'
import work from './assets/work.jpg'


const WorkerLogin = () => {

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [errMessage, setErrMessage] = useState("")
    // const navigate = useNavigate()


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(email);
    //     const { data } = await axios.post("/worker/login",{ email, password })
    //     console.log(data);
    //     if (data.err) {
    //         setErrMessage(data.message)
    //     } else {
    //         navigate("/worker")
    //     }
    // }
    return (

        <section className="bg-black min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                <div className="md:w-1/2 px-16">
                    <h2 className='font-bold text-4xl text-[#002D74]'>Login</h2>
                    <p className='text-sm mt-4 text-[#002D74]'>Welcome Back Collector!</p>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        <input className='p-2 mt-8 rounded-xl border' type="email" name="email" placeholder='Email' id="" onChange={(e) => setEmail(e.target.value)} />
                        <div className="relative">
                            <input className='p-2  rounded-xl border w-full' type="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <svg className="w-5 absolute top-1 right-3 translate-y-1/2 h-4 text-gray-500" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                                </g>
                            </svg>
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