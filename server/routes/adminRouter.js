import express from "express";
import { addDriver, addWorker, adminLogin, block,  unBlock, viewDrivers, viewUsers, viewWorkers } from "../controller/adminController.js";




const router = express.Router()

//auth
router.post('/login',adminLogin)

//post requests
router.post('/workers/add',addWorker)
router.post('/drivers/add',addDriver)




//get requets
router.get('/users',viewUsers)
router.get('/workers',viewWorkers)
router.get('/drivers',viewDrivers)



//update requests

router.patch('/block',block)
router.patch('/unblock',unBlock)



export default router