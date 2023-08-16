import { useEffect, useState } from "react"
import AdminStats from "./AdminStats/AdminStats"
import Bar from "./Charts/Bar/Bar"
import Pie from "./Charts/Pie/Pie"
import Sidebar from "./Sidebar/Sidebar"
import { getStats } from "../../services/adminApi"
import MixedPie from "./Charts/MixedPie/MixedPie"



const AdminDashboard = () => {

    const [totalSums, setTotal] = useState()
    const [count, setCount] = useState()

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getStats()
                    if (data.success) {
                        console.log(data);
                        setTotal(data.totalSums)
                        setCount(data.count)
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>

            <Sidebar />
            {count && <AdminStats count={count} />}
            <div className="flex flex-row ml-64  gap-36 mt-10 justify-center  items-center ">
                {totalSums &&
                    <Pie data={totalSums} />
                }
                <MixedPie />

            </div>
            <Bar />



        </>
    )

}

export default AdminDashboard 