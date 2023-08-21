import express from "express";
import { UpdateLocation, acceptTask, driverAuth, driverLogin, getTasks, profileUpdate, updateStatus } from "../controller/driverController.js";
import { verifyDriver } from "../middlewares/verifyDriver.js";




const router = express.Router()

router.post('/auth',driverAuth)
router.post('/login',driverLogin)
router.post('/getTask',verifyDriver,getTasks)



router.patch('/statusUpdate',verifyDriver,updateStatus)
router.patch('/acceptTask',verifyDriver,acceptTask)
router.patch('/UpdateLocation',verifyDriver,UpdateLocation)
router.patch('/updateProfile',verifyDriver,profileUpdate)










export default router