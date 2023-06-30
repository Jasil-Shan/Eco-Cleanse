import express from 'express'
import { generateOTP } from '../controller/authController.js'



const router = express.Router()


router.post('/verify',generateOTP)




export default router