import axiosInstance from "../axios/axios"



export const authWorker = () =>{
    return axiosInstance("WorkerJwtkey").post('/worker/auth')
}

export const taskComplete = (garbageDetails,taskId,location) =>{
    return axiosInstance("WorkerJwtkey").post('/worker/taskComplete', { garbageDetails, taskId,location })
}

export const getBooking = (id)=>{
    return axiosInstance("WorkerJwtkey").get(`/worker/booking?id=${id}`)
  }