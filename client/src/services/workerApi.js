import axiosInstance from "../axios/axios"



export const authWorker = () =>{
    return axiosInstance("WorkerJwtkey").post('/worker/auth')
}

export const taskComplete = (completeData) =>{
    return axiosInstance("WorkerJwtkey").post('/worker/taskComplete', { ...completeData })
}

export const getBooking = (id)=>{
    return axiosInstance("WorkerJwtkey").get(`/worker/booking?id=${id}`)
  }