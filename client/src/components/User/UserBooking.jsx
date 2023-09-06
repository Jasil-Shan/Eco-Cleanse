import { useState } from "react"
import Card from "./Card/Card"
import Navbar from "./Navbar/Navbar"
import BookingForms from "./Swiper/BookingForms"
import ewaste from './assets/ewaste.png'
import { useEffect } from "react"
import { getBookings } from "../../services/userApi"
import Success from "./Success Card/Success"


const UserBooking = () => {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
      try {
        (
          async function () {
            const { data } = await getBookings()
            if (data.status) {
              setBookings(data.bookings)
            }
          })()
      } catch (error) {
        console.log(error);
      }
    }, []);
    const pendingBookings = bookings.filter((booking) => booking.status === "Pending");
    return (
        <>
        <Navbar />
        <div className="h-screen bg-[url()] bg-cover flex justify-center items-center overflow-hidden"> 
        {
            pendingBookings.length>0 ?
            <Success orderId= {pendingBookings[0].order_id} />
            :
            <BookingForms />
        }
        </div>
        </>

    )
}

export default UserBooking