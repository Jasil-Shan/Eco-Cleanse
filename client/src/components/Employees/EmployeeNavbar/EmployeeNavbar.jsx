import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authWorker } from '../../../services/workerApi';
import { setWorkerDetails } from '../../../redux/features/workerSlice';
import { authDriver } from '../../../services/driverApi';
import { setDriverDetails } from '../../../redux/features/driverSlice';

const EmployeeNavbar = ({ role,refresh }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let profile 
  if (role == 'worker') {
    profile = useSelector((state) => state.worker)
  } else {
    profile = useSelector((state) => state.driver)
  }

  useEffect(() => {
    if (!profile.name || refresh || !refresh) {
      role == 'worker' ?
      (async function () {
        const { data } = await authWorker()
        if (data.status) {
          dispatch(
            setWorkerDetails({
              id: data.worker._id,
              name: data.worker.name,
              email: data.worker.email,
              mobile: data.worker.mobile,
              place: data.worker.place,
              image: data.worker.image,
              role: data.worker.role,
              location: data.worker.location,
              status: data.worker.status,
              task: data.worker.task,
              assigned: data?.worker?.assigned,
            })
          );
        }
      })()
      :
      (async function () {
        const { data } = await authDriver()
        if (data.status) {
          dispatch(
            setDriverDetails({
              id: data.driver._id,
              name: data.driver.name,
              email: data.driver.email,
              mobile: data.driver.mobile,
              place: data.driver.place,
              image: data.driver.image,
              role: data.driver.role,
              location: data.driver.location,
              status: data.driver.status,
              task: data.driver.task,
              assigned: data?.driver?.assigned,
            })
          );
        }
      })()
    }
  }, [refresh])

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
        <a className="btn btn-ghost normal-case text-xl">Eco Cleanse</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end mr-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={profile.image} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {
              profile.role == 'driver' ?
                <>
                  <li>
                    <Link to={'/driver/profile'} state={'driver'}>
                      <p className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </p></Link>
                  </li>
                  <li><Link to={'/driver/history'}><a>History</a></Link></li>
                  <li onClick={
                    () => {
                      localStorage.removeItem('DriverJwtkey')
                      navigate('/driver/login')
                    }}><a>Logout</a></li>
                </>
                :
                <>
                  <li>
                    <Link to={'/worker/profile'}  state={'worker'}>
                      <p className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </p></Link>
                  </li>
                  <li><Link to={'worker/history'}><a>History</a></Link></li>
                  <li onClick={
                    () => {
                      localStorage.removeItem('WorkerJwtkey');
                      navigate('/worker/login')
                    }}><a>Logout</a></li>
                </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmployeeNavbar