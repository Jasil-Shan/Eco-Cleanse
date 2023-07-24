import express from "express";
import { userBooking } from "../controller/userController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router()



router.get('/booking', verifyUser ,userBooking)












export default router