import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import AdminStats from "./AdminStats/AdminStats"



const AdminDashboard = () => {

    return (
        <>
        <div className="container">
            <Sidebar />
            <Header />
            <AdminStats />
            </div>
                       
        </>
    )

}

export default AdminDashboard 