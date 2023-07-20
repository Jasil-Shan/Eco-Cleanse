import { useEffect, useState } from "react"
import { authAdmin } from "../services/adminApi"


const PrivateRoutes = ({ role, route }) => { 

    const [auth,setAuth] = useState(null)


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
    },[])
}


if( auth == null) return 

return (
  auth ? <Outlet/> : <Navigate to={route} />
)


export default PrivateRoutes