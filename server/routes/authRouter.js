import express from 'express'
import { generateOTP, signUp } from '../controller/authController.js'



const router = express.Router()


router.post('/verify',generateOTP)
router.post('/signup', signUp)




export default router