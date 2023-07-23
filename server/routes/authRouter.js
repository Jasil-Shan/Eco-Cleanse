import express from 'express'
import { generateOTP, login, signUp, userAuth } from '../controller/authController.js'



const router = express.Router()

router.post('/auth', userAuth)
router.post('/verify',generateOTP)
router.post('/signup', signUp)
router.post('/login', login)




export default router