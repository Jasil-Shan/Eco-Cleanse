import express from "express";
import { UpdateLocation, acceptTask, driverAuth, driverLogin, getTasks, updateStatus } from "../controller/driverController.js";
import { verifyDriver } from "../middlewares/verifyDriver.js";




const router = express.Router()

router.post('/auth',driverAuth)
router.post('/login',driverLogin)
router.post('/UpdateLocation',verifyDriver,UpdateLocation)
router.post('/getTask',verifyDriver,getTasks)



router.patch('/statusUpdate',verifyDriver,updateStatus)
router.patch('/acceptTask',verifyDriver,acceptTask)










export default router