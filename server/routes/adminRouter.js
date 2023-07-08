import express from "express";
import { adminLogin, viewDrivers, viewUsers, viewWorkers } from "../controller/adminController.js";




const router = express.Router()

//post requests
router.post('/login',adminLogin)




//get requets
router.get('/users',viewUsers)
router.get('/workers',viewWorkers)
router.get('/drivers',viewDrivers)



export default router