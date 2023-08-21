import { toast } from "react-toastify";
import { getCurrentLocation } from "../../../helpers/currentLocation";
import { updateLocation, updateStatus } from "../../../services/driverApi";
import Tasks from "../Tasks/Tasks";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeNavbar from "../EmployeeNavbar/EmployeeNavbar";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'


const Dashboard = ({ role, setRefresh, refresh }) => {


    let profile
    if (role == 'worker') {
        profile = useSelector((state) => state.worker)
    } else {
        profile = useSelector((state) => state.driver)
    }


    const handleSubmit = async () => {
        try {
            const locations = await getCurrentLocation()
            const { data } = await updateLocation(locations, role);
            console.log(data);
            if (data.success) {
                setRefresh(!refresh)
                toast.success(data.message, {
                    position: "top-center",

                })
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleStatus = async (status) => {
        try {
            const locations = await getCurrentLocation()
            const { data } = await updateStatus(locations, role, status);
            console.log(data);
            if (data.success) {
                setRefresh(!refresh)
                toast.success(data.message, {
                    position: "top-center",

                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <EmployeeNavbar role={profile.role} />
            <div className="container mx-auto  p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    {/* Left Side */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* Profile Card */}
                        <div className="bg-base-100 shadow-md card p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img
                                    className="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <img className="self-center rounded-3xl  w-fit " src={profile.image} alt="dndjsh" />

                                <span className="text-gray-900 w-fit font-bold text-xl leading-8 mt-5 uppercase">{profile.name}</span>
                                <p className="text-gray-600 font-lg w-fit text-semibold leading-6 uppercase">{profile.role}</p>

                            </div>
                            <ul className="bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <details className="dropdown">
                                            <summary className={profile.status == 'Available' ? "bg-green-500 py-1 px-2 rounded text-white font-semibold text-sm uppercase cursor-pointer" : "bg-red-600 cursor-pointer py-1 px-2 rounded text-white font-semibold text-sm uppercase"}>{profile.status}</summary>
                                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                                {profile.status == 'Available' ?
                                                    <li onClick={()=>handleStatus('Offline')}><a>Go Offline</a></li>
                                                    :
                                                    <li onClick={()=>handleStatus('Available')}><a>Go Online </a></li>
                                                }
                                            </ul>
                                        </details>
                                        </span>
                                </li>
                            </ul>
                        </div>
                        {/* End of profile card */}

                        {/* Friends card */}
                        <div className="bg-white card mt-8 shadow-lg p-3 hover:shadow">
                            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                <span className="text-green-500">
                                    <svg
                                        className="h-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </span>
                                <span>Location Info</span>
                            </div>
                            <div className="w-45 h-55">

                            </div>
                            <button className='btn bg-green-500 btn-sm text-white mt-6' onClick={handleSubmit}>Update</button>

                        </div>
                        {/* End of friends card */}
                    </div>
                    {/* End of Left Side */}

                    {/* Right Side */}
                    <div className="w-full md:w-9/12 mx-2 h-64 shadow-xl card  my-5  ">
                        <div className="bg-white p-3  rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                        <div className="px-4 py-2 ">{profile.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                        <div className="px-4 py-2">Doe</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                        <div className="px-4 py-2">Male</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2">{profile.mobile}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Current Address</div>
                                        <div className="px-4 py-2">{profile.place}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Permanent Address</div>
                                        <div className="px-4 py-2">{profile.place}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href="mailto:jane@example.com">
                                                {profile.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                        <div className="px-4 py-2">{profile.dob}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End of about section */}

                        <div className="order-1">
                            {profile.task ?

                           <Tasks id={profile.task} role={profile.role} />
                                : <h1>No Tasks</h1>
                            }
                        </div>
                    </div>

                    {/* End of right side */}
                </div>
            </div>
        </>
    )
}



export default Dashboard