import axiosInstance from "../axios/axios.js";



export const authDriver = () => {
  return axiosInstance("DriverJwtkey").post('/driver/auth')
}


export const updateLocation = (location, role) => {
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

export const getTasks = (taskId, role) => {
  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").post('/driver/getTask', { taskId })
  } else {
    return axiosInstance("WorkerJwtkey").post('/worker/getTask', { taskId })

  }
}


export const TaskAccept = (taskId, role) => {
  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").patch('/driver/acceptTask', { taskId })
  } else {
    return axiosInstance("WorkerJwtkey").patch('/worker/acceptTask', { taskId })

  }
}

export const profileUpdate = (role, values) => {
  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").patch('/driver/updateProfile', { ...values })
  } else {
    return axiosInstance("WorkerJwtkey").patch('/worker/updateProfile', { ...values })

  }
}

export const getHistory = (role) => {
  if (role == 'driver') {
    return axiosInstance("DriverJwtkey").get('/driver/history')
  } else {
    return axiosInstance("WorkerJwtkey").get('/worker/history')
  }
}


export const taskComplete = (location) =>{
  return axiosInstance("DriverJwtkey").patch('/driver/taskComplete',{location})
}
