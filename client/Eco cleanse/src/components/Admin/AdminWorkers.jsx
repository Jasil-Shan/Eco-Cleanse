import { useEffect, useState } from "react"



const AdminWorkers = () =>{

    const[users , setWorkers] = useState([])

    useEffect(()=>{
        try {
            const {data} = await axios.get('/admin/workers')
            if(success){
                setUsers(data.workers)
            }
        } catch (error) {
            console.log(error);
        }
    })

    return(

    )
}

export default AdminWorkers