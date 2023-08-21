import express from "express";
import { UpdateLocation, acceptTask, getWorkerTasks, profileUpdate, taskComplete, updateStatus, workerAuth, workerLogin } from "../controller/workerController.js";
import { verifyWorker } from "../middlewares/verifyWorker.js";




const router = express.Router()


router.post('/login',workerLogin)
router.post('/auth',workerAuth)
router.post('/taskComplete',taskComplete)
router.post('/getTask',verifyWorker,getWorkerTasks)

router.patch('/statusUpdate',verifyWorker,updateStatus)
router.patch('/acceptTask',verifyWorker,acceptTask)
router.patch('/UpdateLocation',verifyWorker,UpdateLocation)
router.patch('/updateProfile',verifyWorker,profileUpdate)








export default router