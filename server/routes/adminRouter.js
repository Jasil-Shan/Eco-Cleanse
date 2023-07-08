import express from "express";
import { adminLogin, viewUsers } from "../controller/adminController.js";




const router = express.Router()

//post requests
router.post('/login',adminLogin)




//get requets
router.get('/users',viewUsers)



export default router