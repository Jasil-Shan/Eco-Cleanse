import orderId from "order-id";
import BookingModel from "../model/bookingModel.js";
import WorkerModel from "../model/workerModel.js";
import DriverModel from "../model/driverModel.js";
import { calculateDistance } from "../helper/calculateDistance.js";
import UserModel from "../model/userModel.js";


export async function userBooking(req, res) {
  try {
    const { garbage, payment, totalAmount } = req.body;
    const _id = req.userId;
    const order_id = orderId('Eco').generate();
    const user = await UserModel.findById(_id)
    const driver = await DriverModel.find({ status: 'Available' })
    const worker = await WorkerModel.find({ status: 'Available' })

    if (driver.length === 0 || worker.length === 0) {
      return res.json({
        success: false,
        message: 'Service Unavailable at the moment, Try again later',
      })
    }

    const workerDistance = worker.map((worker) => {
      const distance = calculateDistance(
        user.location[1],
        user.location[0],
        worker.location[1],
        worker.location[0]
      );
      return { ...worker.toObject(), distance };
    })

    const driverDistance = driver.map((driver) => {
      const distance = calculateDistance(
        user.location[1],
        user.location[0],
        driver.location[1],
        driver.location[0]
      );
      return { ...driver.toObject(), distance };
    })

    const nearbyWorkers = workerDistance.filter(
      (worker) => worker.distance <= 20
    )
    const nearbyDrivers = driverDistance.filter(
      (driver) => driver.distance <= 20
    )

    nearbyWorkers.sort((a, b) => a.distance - b.distance)
    nearbyDrivers.sort((a, b) => a.distance - b.distance)
    
    if (nearbyDrivers.length === 0 || nearbyWorkers.length === 0) {
      return res.json({
        success: false,
        message: 'Service Unavailable at your area, Try again later',
      })
    }

    const booking = await BookingModel.create({
      garbage: garbage,
      paymentMethod: payment,
      user: _id,
      order_id,
      totalAmount
    })

    const taskPromises = [];

    nearbyWorkers.forEach((worker) => {
      const workerPromise = WorkerModel.findByIdAndUpdate(worker._id, {
        $set: { task: booking._id },
      });
      taskPromises.push(workerPromise);
    });

    nearbyDrivers.forEach((driver) => {
      const driverPromise = DriverModel.findByIdAndUpdate(driver._id, {
        $set: { task: booking._id },
      });
      taskPromises.push(driverPromise);
    });

    taskPromises.push(
      BookingModel.findByIdAndUpdate(booking._id, {
        $set: { assigned: true },
      })
    );

    Promise.all(taskPromises)
      .then(() => {
        res.json({ success: true, message: 'Request Accepted', order_id });
      })
      .catch((error) => {
        console.log(error);
        res.json({ success: false, message: 'Try Again' });
      });

    //  Promise.all([
    //   WorkerModel.findByIdAndUpdate(nearWorker, {
    //     $set: { task: booking._id }
    //   }),
    //   DriverModel.findByIdAndUpdate(nearDriver, {
    //     $set: { task: booking._id }
    //   }),
    //   BookingModel.findByIdAndUpdate(booking._id, {
    //     $set: { assigned : true }
    //   })
    // ]).then(() => {
    //   res.json({ success: true, message: 'Request Accepted', order_id })
    // }).catch((error) => {
    //   console.log(error)
    //   res.json({ success: false, message: "Try Again" });

    // })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Try Again" });
  }
}



export async function getBookings(req, res) {

  try {
    const _id = req.userId
    const bookings = await BookingModel.find({ user: _id }).populate('driver').populate('worker').populate('user')
    console.log(bookings)
    res.json({ status: true, bookings, message: "success" })

  } catch (error) {
    console.log(error)
  }
}

export async function profileUpdate(req, res) {
  try {
    const _id = req.userId
    const { mobile, name } = req.body
    await UserModel.findByIdAndUpdate(_id, { $set: { mobile, name } })
    res.json({ success: true, message: "profile updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Try Again" })
  }
}

export async function checkAvailability(req, res) {
  try {

    const driver = await DriverModel.find({ status: 'Available' })
    const worker = await WorkerModel.find({ status: 'Available' })
    if (driver.length === 0 || worker.length === 0) {
      return res.json({
        error: true,
        message: 'Service Unavailable at the moment, Try again later',
      })
    } else {
      return res.json({
        error: false,
        message: 'Employees Available',
      })
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getStats(req, res) {
  try {

    const pipeline = [
      {
        $group: {
          _id: null,
          totalFoodWaste: { $sum: { $toInt: "$garbageCollected.foodWaste" } },
          totalEWaste: { $sum: { $toInt: "$garbageCollected.eWaste" } },
          totalPlasticWaste: { $sum: { $toInt: "$garbageCollected.plasticWaste" } },
          totalOthers: { $sum: { $toInt: "$garbageCollected.Others" } }
        }
      }
    ];

    const result = await BookingModel.aggregate(pipeline);

    const totalSums = {
      foodWaste: result[0].totalFoodWaste,
      eWaste: result[0].totalEWaste,
      plasticWaste: result[0].totalPlasticWaste,
      Others: result[0].totalOthers
    }

    const totalSum = Object.values(totalSums).reduce((acc, curr) => acc + curr, 0);

    return res.json({success:true , totalSum,totalSums})

  } catch (error) {
    console.error(error);
  }
}