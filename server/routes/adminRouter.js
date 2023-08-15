import express from "express";
import {  addEmployee, adminAuth, adminLogin, assignWork, block,  getLocation,  sendMail,  unBlock, viewDrivers, viewUsers, viewWorkers, viewWorks } from "../controller/adminController.js";




const router = express.Router()

//auth
router.post('/login',adminLogin)
router.post('/auth/',adminAuth)

//post requests
router.post('/sendMail',sendMail)
router.post('/addEmployee',addEmployee)
router.post('/assignWork',assignWork)





//get requets
router.get('/users',viewUsers)
router.get('/workers',viewWorkers)
router.get('/drivers',viewDrivers)
router.get('/works',viewWorks)
router.get('/getLocation',getLocation)



//update requests

router.patch('/block',block)
router.patch('/unblock',unBlock)



export default router