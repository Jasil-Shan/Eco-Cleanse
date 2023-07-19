import axiosInstance from "../axios/axios.js";




export const adminLogin = (values) =>{
    return axiosInstance("adminJwtToken").post('/admin/login' , {...values})
  }

export const getUsers = ()=>{
    return axiosInstance("adminJwtToken").get('/admin/users')
  }

