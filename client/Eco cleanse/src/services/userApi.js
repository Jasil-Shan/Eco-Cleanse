import axiosInstance from "../axios/axios.js";


export const userLogin = (email ,password) =>{
    return axiosInstance("JwtToken").post('/user/login' , {email ,password})
  }
