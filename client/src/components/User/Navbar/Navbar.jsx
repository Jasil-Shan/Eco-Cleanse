import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../services/userApi";
import { setUserDetails } from "../../../redux/features/userSlice";
import { useEffect, useState } from "react";



const Navbar = () => {
  const navigate = useNavigate()
  const users = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(users.id ? true : false);



  useEffect(() => {
    if (!users.id) {
      authUser().then((response) => {
        if (response.data.status) {
          dispatch(
            setUserDetails({
              name: response.data.user.name,
              id: response.data.user._id,
              email: response.data.user.email,
              mobile: response.data.user.mobile,
            })
          );
        }
      })
    }
  }, [])
  return (
    

    <div className="navbar text-white z-50 bg-transparent mb-1 shadow-lg bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case font-semibold text-xl">Eco cleanse</a>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal mr-6 font-semibold px-1">
        <Link to={'/'}><li><a>Home</a></li></Link>
          <Link to={'/booking'}><li><a>Booking</a></li></Link>
          <li><a>Blog</a></li>
        </ul>
        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">9 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}
        {
          isLoggedIn ?
            <div className="dropdown dropdown-end mr-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://source.unsplash.com/100x100/?portrait" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={
                  () => {
                    localStorage.removeItem('UserJwtkey');
                    setIsLoggedIn(false)
                    navigate('/')
                  }}><a>Logout</a></li>
              </ul>
            </div>
            :
            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 mt-2 text-center mr-5 mb-2">
              <Link to="/login">Sign in </Link></button>
        }
      </div>
    </div>

  );
}

export default Navbar