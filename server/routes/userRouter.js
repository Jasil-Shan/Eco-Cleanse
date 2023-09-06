import express from "express";
import { checkAvailability, getBookings, profileUpdate, userBooking } from "../controller/userController.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { createPayment, paymentVerification } from "../controller/paymentController.js";

const router = express.Router()



router.post('/booking',verifyUser,userBooking)
router.post('/payment',verifyUser,createPayment)
router.post('/paymentVerify',verifyUser,paymentVerification)


router.get('/getBooking',getBookings)
router.get('/check',checkAvailability)


router.patch('/updateProfile',verifyUser,profileUpdate)





export default router