import orderId from "order-id";
import BookingModel from "../model/bookingModel.js";
import WorkerModel from "../model/workerModel.js";
import DriverModel from "../model/driverModel.js";
import { calculateDistance } from "../helper/calculateDistance.js";
import UserModel from "../model/userModel.js";


export async function userBooking(req, res) {
  try {
    const { garbage, payment } = req.body;
    const _id = req.userId;
    const order_id = orderId('Eco').generate();
    const user = await UserModel.findById(_id)
    const driver = await DriverModel.find({})
    const worker = await WorkerModel.find({})

    const workerDistance = worker.map((worker) => {
      const distance = calculateDistance(
        user.location[1],
        user.location[0],
        worker.location[1],
        worker.location[0]
      );
      return { ...worker.toObject(), distance };
    });
    const driverDistance = driver.map((driver) => {
      const distance = calculateDistance(
        user.location[1],
        user.location[0],
        driver.location[1],
        driver.location[0]
      );
      return { ...driver.toObject(), distance };
    });
    const nearbyWorker = workerDistance.filter(
      (worker) => worker.distance <= 10
    )
    const nearbyDriver = driverDistance.filter(
      (driver) => driver.distance <= 10
    )
    nearbyWorker.sort((a, b) => a.distance - b.distance)
    nearbyDriver.sort((a, b) => a.distance - b.distance)

    const nearWorker = nearbyWorker[0]._id
    const nearDriver = nearbyDriver[0]._id

    const booking = await BookingModel.create({
      garbage: garbage,
      paymentMethod: payment,
      user: _id,
      order_id,
      worker: nearWorker,
      driver: nearDriver,
    })

     Promise.all([
      WorkerModel.findByIdAndUpdate(nearWorker, {
        $set: { task: booking._id }
      }),
      DriverModel.findByIdAndUpdate(nearDriver, {
        $set: { task: booking._id }
      }),
      BookingModel.findByIdAndUpdate(booking._id, {
        $set: { assigned : true }
      })
    ]).then(() => {
      res.json({ success: true, message: 'Request Accepted', order_id })
    }).catch((error) => {
      console.log(error)
      res.json({ success: false, message: "Try Again" });

    })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Try Again" });
  }
}



export async function getBookings(req, res) {

  try {

    const bookings = await BookingModel.find({}).populate('driver').populate('worker')
    res.json({ status: true, bookings, message: "success" })

  } catch (error) {
    console.log(error)
  }
}

