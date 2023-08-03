import orderId from "order-id";
import BookingModel from "../model/bookingModel.js";


export async function userBooking(req, res) {
  try {
    const { garbage, payment } = req.body;
    const id = req.userId;
    const order_id = orderId.generate();


    await BookingModel.create({
      garbage: garbage,
      paymentMethod: payment,
      user: id,
      order_id
    })
    res.json({ success: true, message: "Added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed" });
  }
}


export async function getBookings(req, res) {

  try {

    const bookings = await BookingModel.find({})
    res.json({ status: true,bookings, message: "success" })

  } catch (error) {
    console.log(error);
  }

}