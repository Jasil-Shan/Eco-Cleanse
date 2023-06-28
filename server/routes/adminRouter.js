import express from "express";
import { getAdminLogin } from "../controller/adminController.js";




const router = express.Router()


router.get('/login',getAdminLogin)



export default router