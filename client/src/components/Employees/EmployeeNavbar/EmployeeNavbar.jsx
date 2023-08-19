import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const EmployeeNavbar = ({profile}) => {
    const navigate = useNavigate()
    return (
        <div className="navbar shadow-lg rounded-sm bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
            <div className="dropdown dropdown-end mr-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={profile.image} />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to={'/profile'}>
                    <p className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </p></Link>
                </li>
                <li><Link to={'/history'}><a>History</a></Link></li>
                { profile.role == 'driver' ?
                <li onClick={
                  () => {
                    localStorage.removeItem('DriverJwtkey')
                    navigate('/driver/login')
                  }}><a>Logout</a></li>
                  :
                  <li onClick={
                    () => {
                      localStorage.removeItem('WorkerJwtkey');
                      navigate('/worker/login')
                    }}><a>Logout</a></li>
                }
              </ul>
            </div>        
                </div>
        </div>
    )
}

export default EmployeeNavbar