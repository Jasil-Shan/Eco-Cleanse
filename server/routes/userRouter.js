import express from "express";
import { getBookings, profileUpdate, userBooking } from "../controller/userController.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { createPayment, paymentVerification } from "../controller/paymentController.js";

const router = express.Router()



router.post('/booking',verifyUser,userBooking)
router.post('/payment',createPayment)
router.post('/paymentVerify',verifyUser,paymentVerification)
router.get('/getBooking',getBookings)


router.patch('/updateProfile',verifyUser,profileUpdate)





export default router