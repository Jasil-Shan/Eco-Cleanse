import express from "express";
import { UpdateLocation, acceptTask, getWorkerTasks, taskComplete, updateStatus, workerAuth, workerLogin } from "../controller/workerController.js";
import { verifyWorker } from "../middlewares/verifyWorker.js";




const router = express.Router()


router.post('/login',workerLogin)
router.post('/auth',workerAuth)
router.post('/UpdateLocation',verifyWorker,UpdateLocation)
router.post('/taskComplete',taskComplete)
router.post('/getTask',verifyWorker,getWorkerTasks)

router.patch('/statusUpdate',verifyWorker,updateStatus)
router.patch('/acceptTask',verifyWorker,acceptTask)









export default router