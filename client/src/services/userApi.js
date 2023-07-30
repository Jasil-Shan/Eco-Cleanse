import axiosInstance from "../axios/axios"


export const userLogin = (values) =>{
    return axiosInstance("UserJwtkey").post('/user/login' , {...values})
  }

  export const authUser = ()=>{
    return axiosInstance("UserJwtkey").post('/user/auth' )

  }

  export const userBooking = (payment,garbage)=>{
    return axiosInstance("UserJwtkey").post('/booking', {...payment,garbage} )

  }

