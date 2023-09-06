import express from "express";
import {  addEmployee, adminAuth, adminLogin, assignWork, block,  getEmployees,  sendMail,  totalStats,  unBlock, viewBookings, viewDrivers, viewUsers, viewWorkers } from "../controller/adminController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";




const router = express.Router()

//auth
router.post('/login',adminLogin)
router.post('/auth/',adminAuth)

//post request
router.use(verifyAdmin)
router.post('/sendMail',sendMail)
router.post('/addEmployee',addEmployee)
router.post('/assignWork',assignWork)





//get requets
router.use(verifyAdmin)
router.get('/users',viewUsers)
router.get('/workers',viewWorkers)
router.get('/drivers',viewDrivers)
router.get('/bookings',viewBookings)
router.get('/getLocation',getEmployees)
router.get('/getStats',totalStats)



//update requests
router.use(verifyAdmin)
router.patch('/block',block)
router.patch('/unblock',unBlock)



export default router