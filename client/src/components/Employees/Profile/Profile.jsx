import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { BsPhoneFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import EmployeeNavbar from '../EmployeeNavbar/EmployeeNavbar';

const Profile = () => {
    const location = useLocation()
    const profile = location.state
    const [editMode, setEditMode] = useState(false)
    console.log(profile)
    return (
        <>
            <EmployeeNavbar profile={profile} />
            {!editMode ?
                <main className="profile-page flex justify-center items-center mt-60 ">
                    <section className="flex  ">
                        <div className="top-auto bottom-0 left-0 right-0 w-60 absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-10 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative card py-10 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-between">

                                        <div className="w-full lg:w-4/12  px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button  onClick={()=>setEditMode(true)} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                                                    <span className="text-sm text-blueGray-400">Works</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-center items-center align-middle">
                                        <img
                                            alt="..."
                                            src={profile?.image}
                                            className="shadow-xl rounded-full   border-none mr-16  ml-20 lg:ml-16 max-w-150-px"
                                        />
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">{profile.name}</h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            {profile.place}
                                        </div>
                                        <div className="flex items-center justify-center mb-4 mt-5">
                                            <BsPhoneFill />
                                            <h3 className="ml-2">{profile.mobile}</h3>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <MdEmail />
                                            <h3 className="ml-2">{profile.email}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>
                </main>
                :
                <main className="profile-page flex justify-center items-center mt-60 ">
                    <section className="flex  ">
                        <div className="top-auto bottom-0 left-0 right-0 w-60 absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-10 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative card p-16 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-between">

                                        <div className="w-full lg:w-4/12  px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                     Save
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span onClick={()=>setEditMode(false)} className="text-sm font-bold block underline cursor-pointer tracking-wide text-blueGray-600">Back</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-center items-center align-middle">
                                        <img
                                            alt="..."
                                            src={profile.image}
                                            className="shadow-xl rounded-full   border-none mr-16  ml-20 lg:ml-16 max-w-150-px"
                                        />
                                    </div>
                                    <div className="text-center mt-12">
                                        <input type='text' placeholder={profile.name} className='input'/>
                                      
                                        <div className="flex items-center justify-center mb-4 mt-5">
                                            <input type='number' className="ml-2 input" placeholder={profile.mobile}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            }
        </>
    );

}
export default Profile