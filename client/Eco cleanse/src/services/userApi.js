import axiosInstance from "../axios/axios.js";


export const userLogin = (values) =>{
    return axiosInstance("JwtToken").post('/user/login' , {values})
  }
