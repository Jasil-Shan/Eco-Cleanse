import axiosInstance from "../axios/axios.js";




export const adminLogin = (values) =>{
    return axiosInstance("AdminJwtkey").post('/admin/login' , {...values})
  }

export const authAdmin = ()=>{
  return axiosInstance("AdminJwtkey").post("/admin/auth")
}


export const getUsers = (page,limit,search,sort) => {
  return axiosInstance("AdminJwtkey").get(`/admin/users?page=${page}&sort=${sort}&search=${search}&limit=${limit}`);
};

export const getBookings = (page,limit)=>{
  return axiosInstance("AdminJwtkey").get(`/admin/bookings?page=${page}&limit=${limit}`)
}

export const getWorkers = (page,limit,search,sort)=>{
  return axiosInstance("AdminJwtkey").get(`/admin/workers?page=${page}&sort=${sort}&search=${search}&limit=${limit}`)
}

export const getDrivers = (page,limit,search,sort)=>{
  return axiosInstance("AdminJwtkey").get(`/admin/drivers?page=${page}&sort=${sort}&search=${search}&limit=${limit}`)
}

export const getEmployees = ()=>{
  return axiosInstance("AdminJwtkey").get('/admin/getEmployees')
}

export const addEmployees = (values,image, location, place, role)=>{
  return axiosInstance("AdminJwtkey").post('/admin/addEmployee', { ...values, image, location, place, role })
}

export const getStats = ()=>{
  return axiosInstance("AdminJwtkey").get('/admin/getStats')
}


export const assignWork = (driverId,workerId,bookingId)=>{
  return axiosInstance("AdminJwtkey").post('/admin/assignWork',{driverId,workerId,bookingId})
}
