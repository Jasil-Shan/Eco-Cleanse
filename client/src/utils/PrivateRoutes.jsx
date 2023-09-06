import { useEffect, useState } from "react"
import { authAdmin } from "../services/adminApi"
import { toast } from "react-toastify"
import { useNavigate, Link, Navigate, Outlet } from "react-router-dom";
import { authUser } from "../services/userApi";
import { authDriver } from "../services/driverApi";
import { authWorker } from "../services/workerApi";


const PrivateRoutes = ({ role, route }) => { 

    const [auth,setAuth] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(role == 'admin'){
            authAdmin().then((response)=>{
                setAuth(response.data.status)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/admin/login');
              })
        }
        else if(role == 'user'){
            authUser().then((response)=>{
                setAuth(response.data.status)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/login');
              })
        }
        else if(role == 'driver'){
            authDriver().then((response)=>{
                setAuth(response.data.status)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/driver/login');
              })
        }
        else if(role == 'worker'){
            authWorker().then((response)=>{
                setAuth(response.data.status)
             }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/worker/login');
              })
        }
    },[])



if( auth == null) return 

return (
  auth ? <Outlet/> : <Navigate to={route} />
)

}
export default PrivateRoutes