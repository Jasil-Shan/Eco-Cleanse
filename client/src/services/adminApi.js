import axiosInstance from "../axios/axios.js";




export const adminLogin = (values) =>{
    return axiosInstance("AdminJwtToken").post('/admin/login' , {...values})
  }

export const authAdmin = ()=>{
  return axiosInstance("AdminJwtToken").post("/admin/auth")
}



export const getUsers = () => {
  return axiosInstance("AdminJwtToken").get('/admin/users');
};

export const getBookings = (page,limit)=>{
  return axiosInstance("AdminJwtToken").get(`/admin/bookings?page=${page}&limit=${limit}`)
}

export const getWorkers = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/workers')
}


export const getEmployees = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/getEmployees')
}

export const getStats = ()=>{
  return axiosInstance("AdminJwtToken").get('/admin/getStats')
}


export const assignWork = (driverId,workerId,bookingId)=>{
  return axiosInstance("AdminJwtToken").post('/admin/assignWork',{driverId,workerId,bookingId})
}
