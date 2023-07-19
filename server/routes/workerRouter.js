import express from "express";
import { workerLogin } from "../controller/workerController.js";




const router = express.Router()


router.post('/login',workerLogin)












export default router