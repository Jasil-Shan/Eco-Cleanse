import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../services/userApi";
import { setUserDetails, setUserSignout } from "../../../redux/features/userSlice";
import { useEffect, useState } from "react";



const Navbar = ({ ProfileRefresh }) => {

  const navigate = useNavigate()
  const users = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {

    if (!users.id || ProfileRefresh || !ProfileRefresh) {

      authUser().then((response) => {

        if (response.data.status) {
          dispatch(
            setUserDetails({
              name: response.data.user.name,
              id: response.data.user._id,
              email: response.data.user.email,
              mobile: response.data.user.mobile,
              address: response.data.user.address,
            })
          );
        }
      })
    }
  }, [refresh, ProfileRefresh])
  return (
    <div className="navbar absolute bg-transparent top-0 shadow-xl  bg-base-100">
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
        <a className="btn btn-ghost text-white normal-case text-xl">Eco Cleanse</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-white font-semibold px-1">
          <Link to={'/'}><li><a>Home</a></li></Link>
          <Link to={'/booking'}><li><a>Booking</a></li></Link>
        </ul>
      </div>
      <div className="navbar-end">
        {users.id && users.id ?
          <div className="dropdown dropdown-end mr-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://source.unsplash.com/100x100/?portrait" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={'/profile'}>
                  <p className="justify-between">
                    Profile
                  </p></Link>
              </li>
              <li><Link to={'/history'}><a>History</a></Link></li>
              <li onClick={
                () => {
                  localStorage.removeItem('UserJwtkey');
                  navigate('/')
                  setRefresh(!refresh)
                  dispatch(setUserSignout())
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