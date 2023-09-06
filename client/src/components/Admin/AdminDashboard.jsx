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
    const [onlineEmployees, setOnlineEmployee] = useState()
    const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);


    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getStats()
                    if (data.success) {
                        console.log(data);
                        setTotal(data.totalSums)
                        setCount(data.count)
                        setOnlineEmployee(data.onlineEmployee)
                        setMonthlyRevenueData(data.monthlyRevenue)
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
            <div className="flex flex-row xl:ml-64 md:gap-36 mt-10 justify-center items-center ">
                {totalSums && onlineEmployees && (
                    <div className="flex flex-col gap-12 lg:flex-row">
                    <Pie data={totalSums} />
                    <MixedPie online={onlineEmployees} />
                    </div>
                )
                }
            </div>
          {monthlyRevenueData &&  <Bar monthlyRevenueData={monthlyRevenueData} />}



        </>
    )

}

export default AdminDashboard 