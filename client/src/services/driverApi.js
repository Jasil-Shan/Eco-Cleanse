import axiosInstance from "../axios/axios.js";



export const authDriver = () => {
  return axiosInstance("DriverJwtkey").post('/driver/auth')
}




export const getLocation = (location, role) => {

  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").patch('/driver/UpdateLocation', { location })
  } else {
    return axiosInstance("WorkerJwtkey").patch('/worker/UpdateLocation', { location })

  }
  
}

export const updateStatus = (location, role, status) => {
  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").patch('/driver/statusUpdate', { location, status })
  } else {
    return axiosInstance("WorkerJwtkey").patch('/worker/statusUpdate', { location, status })

  }
}

export const getTasks = (taskId) => {

  return axiosInstance("DriverJwtkey").post('/driver/getTask', { taskId })

}