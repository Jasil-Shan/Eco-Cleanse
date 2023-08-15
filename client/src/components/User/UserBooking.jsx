import Sidebar from "../Sidebar/Sidebar"
import Card from "./Card/Card"
import Navbar from "./Navbar/Navbar"
import BookingForms from "./Swiper/BookingForms"
import ewaste from './assets/ewaste.png'


const UserBooking = () => {
    return (
        <div className="h-screen bg-[url(https://res.cloudinary.com/dlhldjuis/image/upload/v1690101413/Eco%20cleanse/Untitled_6_l4znzl.png)] bg-cover backdrop-blur-3xl"> 
        <Navbar />
    <BookingForms />
        </div>

    )
}

export default UserBooking