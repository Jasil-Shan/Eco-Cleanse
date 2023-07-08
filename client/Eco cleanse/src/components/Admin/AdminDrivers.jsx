import { useEffect, useState } from "react"



const AdminDrivers = () =>{

    const[users , setDrivers] = useState([])

    useEffect(()=>{
        try {
            const {data} = await axios.get('/admin/drivers')
            if(success){
                setUsers(data.drivers)
            }
        } catch (error) {
            console.log(error);
        }
    })

    return(

    )
}

export default AdminDrivers