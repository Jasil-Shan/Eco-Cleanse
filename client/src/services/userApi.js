import axiosInstance from "../axios/axios"


export const userLogin = (values) =>{
    return axiosInstance("UserJwtkey").post('/user/login' , {...values})
  }

  export const authUser = ()=>{
    return axiosInstance("UserJwtkey").post('/user/auth' )

  }

  export const userOnlinePay = (totalAmount)=>{
    return axiosInstance("UserJwtkey").post('/payment',{totalAmount} )

  }
  export const verifyPayment = (response)=>{
    
    return axiosInstance("UserJwtkey").post('/paymentVerify', {response})

  }

  export const userBooking = (payment,garbage, totalAmount)=>{

    return axiosInstance("UserJwtkey").post('/booking', {...payment,garbage,totalAmount} )

  }

  
  export const availabilityCheck = ()=>{

    return axiosInstance("UserJwtkey").get('/check' )

  }

  export const getBookings = ()=>{

    return axiosInstance("UserJwtkey").get('/getBooking')

  }

  export const UserProfileUpdate = ( values) => {
      return axiosInstance("UserJwtkey").patch('/updateProfile', { ...values })
  }