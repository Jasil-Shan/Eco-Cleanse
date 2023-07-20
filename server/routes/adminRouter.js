import express from "express";
import { addDriver, addWorker, adminAuth, adminLogin, block,  sendMail,  unBlock, viewDrivers, viewUsers, viewWorkers } from "../controller/adminController.js";




const router = express.Router()

//auth
router.post('/login',adminLogin)
router.post('/auth/',adminAuth)

//post requests
router.post('/workers/add',addWorker)
router.post('/sendMail',sendMail)

router.post('/drivers/add',addDriver)




//get requets
router.get('/users',viewUsers)
router.get('/workers',viewWorkers)
router.get('/drivers',viewDrivers)



//update requests

router.patch('/block',block)
router.patch('/unblock',unBlock)



export default router