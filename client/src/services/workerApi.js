import axiosInstance from "../axios/axios"



export const authWorker = () =>{
    return axiosInstance("WorkerJwtkey").post('/worker/auth')
}

