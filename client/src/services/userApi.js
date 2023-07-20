import axiosInstance from "../axios/axios.js";


export const userLogin = (values) =>{
    return axiosInstance("JwtToken").post('/user/login' , {...values})
  }

  export const authUser = ()=>{
    return axiosInstance("JwtToken").post('/user/auth' )

  }

