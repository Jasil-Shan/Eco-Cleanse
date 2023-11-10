import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../services/userApi";
import { setUserDetails, setUserSignout } from "../../../redux/features/userSlice";
import { useEffect, useState } from "react";
import chatGif from '../assets/speech-bubble.gif'



const Navbar = ({ ProfileRefresh }) => {

  const navigate = useNavigate()
  const users = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const senderId = users.id
  const role = 'user'

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
          <Link to={'/'}><li><a>Home</a></li></Link>
          <Link to={'/booking'}><li><a>Booking</a></li></Link>
          </ul>
        </div>
        <Link to={`/`}><a className=" normal-case font-bold text-lg ml-4 cursor-pointer sm:text-xl">Eco Cleanse</a></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-black font-semibold px-1">
          <Link to={'/'}><li><a>Home</a></li></Link>
          <Link to={'/booking'}><li><a>Booking</a></li></Link>
        </ul>
      </div>
      <div className="navbar-end">
        {users.id && users.id ?
        <>
      <Link to={'/Chat'} state={{senderId,role}}><img className="mr-6" style={{height:'38px',width:'38px'}} src={chatGif} alt="" /></Link>
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
                </>
          :
          <Link to="/login"><button className="text-white bg-gradient-to-r from-neutral via-nuetral-500 to-nuetral-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-nuetral-300 dark:focus:ring-green-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 mt-2 text-center mr-5 mb-2">
            Sign in </button></Link>
        }
      </div>
    </div>

  );
}

export default Navbar