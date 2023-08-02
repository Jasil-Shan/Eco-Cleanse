import express from "express";
import { UpdateLocation, updateStatus, workerAuth, workerLogin } from "../controller/workerController.js";
import { verifyWorker } from "../middlewares/verifyWorker.js";




const router = express.Router()


router.post('/login',workerLogin)
router.post('/auth',workerAuth)
router.post('/UpdateLocation',verifyWorker,UpdateLocation)

router.patch('/statusUpdate',verifyWorker,updateStatus)









export default router