import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminSidebarData from "../../../utils/AdminSidebarData";


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <nav className="fixed top-0 z-50 shadow-md py-2 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden  focus:outline-none focus:ring-2  focus:ring-gray-600"
                                onClick={toggleSidebar}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a
                                href="https://flowbite.com"
                                className="flex ml-2 md:mr-24"
                            >

                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                                    Eco Cleanse
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div className="dropdown  ">
                                    <label tabIndex={0} className="p-0  m-0 btn btn-ghost btn-sm btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://source.unsplash.com/100x100/?portrait" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li onClick={
                                            () => {
                                                localStorage.removeItem('UserJwtkey');
                                                navigate('/')
                                                setRefresh(!refresh)
                                                dispatch(setUserSignout())
                                            }}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform ${isSidebarOpen ? "" : "-translate-x-full"
                    } bg-white border-r border-gray-200 xl:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full flex flex-col px-3 pb-2 overflow-y-auto shadow-2xl bg-white ">
                    <ul className="space-y-2 font-medium">
                        {
                            adminSidebarData.map((obj, index) => {

                                return (
                                    <Link to={obj.links} state={obj.role}>
                                        <li className="mt-2">
                                            <h1
                                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-300  group"
                                            >
                                                <span>{obj.icon}</span>
                                                <span className="ml-2">{obj.title}</span>
                                            </h1>
                                        </li>
                                    </Link>
                                )
                            })}
                    </ul>
                    <button className="top-0" onClick={
                        () => {
                            localStorage.removeItem('AdminJwtkey');
                            navigate('/admin/login')
                        }}><a>Logout</a></button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar