import axiosInstance from "../axios/axios.js";




export const adminLogin = (values) =>{
    return axiosInstance("AdminJwtToken").post('/admin/login' , {...values})
  }

export const authAdmin = ()=>{
  return axiosInstance("AdminJwtToken").post("/admin/auth")
}



export const getUsers = ()=>{
    return axiosInstance("AdminJwtToken").get('/admin/users')
}

export const getWorks = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/works')
}

export const getWorkers = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/workers')
}


export const getLocation = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/getLocation')
}


export const assignWork = (driverId,workerId,bookingId)=>{
  return axiosInstance("AdminJwtToken").post('/admin/assignWork',{driverId,workerId,bookingId})
}
