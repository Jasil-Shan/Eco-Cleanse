import axiosInstance from "../axios/axios"



export const authWorker = () =>{
    return axiosInstance("WorkerJwtkey").post('/worker/auth')
}

export const taskComplete = (garbageDetails,
    id,
    location,
    totalAmount) =>{
    return axiosInstance("WorkerJwtkey").post('/worker/taskComplete', { garbageDetails,
        id,
        location,
        totalAmount })
}

export const getBooking = (id)=>{
    return axiosInstance("WorkerJwtkey").get(`/worker/booking?id=${id}`)
  }