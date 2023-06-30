import express from 'express'
import { generateOTP } from '../controller/authController'



const router = express.Router()


router.post('/verify',generateOTP)




export default router