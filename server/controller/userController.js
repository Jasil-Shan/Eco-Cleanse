import BookingModel from "../model/bookingModel.js";
import UserModel from "../model/userModel.js"


export async function userBooking(req, res) {
  try {
    const { garbage, payment } = req.body;
    const id = req.userId;

    await BookingModel.create({
      garbage: garbage,
      paymentMethod: payment,
      user: id
    })
    res.json({ success: true, message: "Added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed" });
  }
}
