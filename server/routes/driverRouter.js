import express from "express";
import { UpdateLocation, acceptTask, driverAuth, driverLogin, getHistory, getTasks, profileUpdate, taskComplete, updateStatus } from "../controller/driverController.js";
import { verifyDriver } from "../middlewares/verifyDriver.js";




const router = express.Router()
router.get('/history',verifyDriver,getHistory)

router.post('/auth',driverAuth)
router.post('/login',driverLogin)
router.post('/getTask',verifyDriver,getTasks)



router.patch('/statusUpdate',verifyDriver,updateStatus)
router.patch('/acceptTask',verifyDriver,acceptTask)
router.patch('/UpdateLocation',verifyDriver,UpdateLocation)
router.patch('/updateProfile',verifyDriver,profileUpdate)
router.patch('/taskComplete',verifyDriver,taskComplete)










export default router