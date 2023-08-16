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
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
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
                                    Shaj Paradise
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow bg-gray-700 divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? "" : "-translate-x-full"
                    } bg-white border-r border-gray-200 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto shadow-2xl bg-white ">
                    <ul className="space-y-2 font-medium">
                        {
                            adminSidebarData.map((obj, index) => {

                                return (
                                    <Link to={obj.links}>
                                    <li>
                                        <h1
                                            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-300  group"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 21"
                                            >
                                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                                <path d="M12.5 0c-.157 0-.313.035-.457.104l-4.086 1.49A2 2 0 0 0 7 3.628v13.744a2 2 0 0 0 1.957 1.935l4.085-1.488A1.999 1.999 0 0 0 14 16.372V2.628a2 2 0 0 0-1.957-1.935l-4.085 1.489A1.998 1.998 0 0 0 7.5 2h-4a2 2 0 0 0-1.997 1.859l-.5 7A2 2 0 0 0 2 13.629V18.5a2 2 0 0 0 1.859 1.997l.5.086a2 2 0 0 0 2.141-1.311l4-13a2 2 0 0 0-1.312-2.64l-.088-.027-.5-.086A2 2 0 0 0 5.5 1h4Z" />
                                            </svg>
                                            <span className="ml-2">{obj.title}</span>
                                        </h1>
                                    </li>
                                    </Link>
                                )
                            })}
          
          </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar