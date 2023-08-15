import express from "express";
import { UpdateLocation, driverAuth, driverLogin, getTasks, updateStatus } from "../controller/driverController.js";
import { verifyDriver } from "../middlewares/verifyDriver.js";




const router = express.Router()

router.post('/auth',driverAuth)

router.post('/login',driverLogin)

router.post('/UpdateLocation',verifyDriver,UpdateLocation)

router.patch('/statusUpdate',verifyDriver,updateStatus)

router.post('/getTask',verifyDriver,getTasks)











export default router