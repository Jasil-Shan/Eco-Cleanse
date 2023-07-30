import axiosInstance from "../axios/axios.js";



export const authDriver = () =>{
  return axiosInstance("DriverJwtkey").post('/driver/auth')
}




export const driverLocation = (location) =>{
    return axiosInstance("DriverJwtkey").post('/driver/UpdateLocation' , {location})
  }
