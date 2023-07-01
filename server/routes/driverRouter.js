import express from "express";
import { driverLogin } from "../controller/driverController.js";




const router = express.Router()


router.get('/login',driverLogin)












export default router