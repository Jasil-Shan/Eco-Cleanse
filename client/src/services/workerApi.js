import axiosInstance from "../axios/axios"



export const authWorker = () =>{
    return axiosInstance("WorkerJwtkey").post('/worker/auth')
}

export const taskComplete = (garbageDetails,taskId) =>{
    return axiosInstance("WorkerJwtkey").post('/worker/taskComplete', { garbageDetails, taskId })
}
