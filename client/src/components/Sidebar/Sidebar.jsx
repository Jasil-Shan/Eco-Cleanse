import React, { useState } from "react";
import adminSidebarData from "../../utils/AdminSidebarData";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate()
    return (
        <div className="absolute z-0 p-3 w-60 h-screen shadow-lg bg-white text-black">
            <div className="flex items-center p-2 shadow-lg space-x-4">
                <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold">Admin</h2>
                    <span className="flex items-center space-x-1">
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">View profile</a>
                    </span>
                </div>
            </div>


            <div className="divide-y divide-gray-700">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    {
                        adminSidebarData.map((obj, index) => {

                            return ( 
                                <li className="bg-white shadow-md font-semibold dark:text-gray-700 mt-6" key={index}>
                                    {
                                        obj.links.map((link, index) => { 
                                            return (
                                                <>
                                                    {/* onClick={() => { navigate(link.route) }} */}
                                                    <button key={index} onClick={() => { navigate(link.route) }}
                                                        rel="noopener noreferrer" className="flex items-center mt-3 p-2 space-x-3 rounded-md ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                            <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                                                        </svg>
                                                        <span>{obj.title}</span>
                                                    </button>
                                                </>
                                            )
                                        })}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>

    )

}


export default Sidebar