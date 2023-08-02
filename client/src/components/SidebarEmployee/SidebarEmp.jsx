import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { driverSidebar } from "../../utils/EmployeeSidebar";


const SidebarEmp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-base-100 shadow-lg">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
           
          </div>
        </div>
      </nav>

      <aside

        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-20 h-screen flex justify-center items-center pt-20 transition-transform shadow-2xl ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-white  sm:translate-x-0 `}
        aria-label="Sidebar"
      >
       
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium text-blue-950">  
        {
          driverSidebar.map((item,index)=>{
            return(
          <li className="flex justify-center items-center mt-8" key={index}>
           <Link to={item.link}><p className="mt-8"> {item.icon}</p></Link> 
          </li>
           ) }) }
        </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarEmp
