import { BiSolidDashboard, BiSolidMessageDetail } from "react-icons/bi";
import { FaTruckMoving, FaUsers } from "react-icons/fa";
import { BsPersonVcardFill } from "react-icons/bs";

const adminSidebarData = [
    {
        title: 'Dashboard',
        links:  "/admin/dashboard",
        icon: <BiSolidDashboard size={22} />
        
    },
    {
        title: 'Requests',
        links: "/admin/work",
        icon: <BiSolidMessageDetail size={22} />

    },
    {
        title: 'Users',
        links: "/admin/users" ,
        icon: <FaUsers size={22} />

    },
    {
        title: 'Worker',
        links: "/admin/workers",
        icon: <BsPersonVcardFill size={22} />

    },
    {
        title: 'Driver',
        links: "/admin/drivers",
        icon: <FaTruckMoving size={22} />

    },
    
   


]

export default adminSidebarData