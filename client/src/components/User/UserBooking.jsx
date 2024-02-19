import { useState } from "react"
import Card from "./Card/Card"
import Navbar from "./Navbar/Navbar"
import BookingForms from "./Swiper/BookingForms"
import ewaste from './assets/ewaste.png'
import { useEffect } from "react"
import { getBookings } from "../../services/userApi"
import Success from "./Success Card/Success"
import Loader from "../Loader/Loader"


const UserBooking = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      (
        async function () {
          setLoading(true)
          const { data } = await getBookings()
          if (data.status) {
            setBookings(data.bookings)
          }
        })()
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    }
  }, []);
  const pendingBookings = bookings.filter((booking) => booking.status === "Pending");
  return (
    <>
      <Navbar />
      <div className="h-screen bg-[url()] bg-cover flex justify-center items-center overflow-hidden">
        {!loading ? (
          pendingBookings.length > 0 ? (
            <Success orderId={pendingBookings[0].order_id} />
          ) : (
            <BookingForms />
          )
        ) : (
          <Loader />
        )}
      </div>
    </>

  )
}

export default UserBooking