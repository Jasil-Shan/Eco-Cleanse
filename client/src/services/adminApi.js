import axiosInstance from "../axios/axios.js";




export const adminLogin = (values) =>{
    return axiosInstance("AdminJwtToken").post('/admin/login' , {...values})
  }

export const getUsers = ()=>{
    return axiosInstance("AdminJwtToken").get('/admin/users')
  }

