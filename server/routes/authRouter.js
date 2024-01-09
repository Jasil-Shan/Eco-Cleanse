import express from 'express'
import { generateOTP, login, oAuth, signUp, userAuth } from '../controller/authController.js'



const router = express.Router()

router.post('/auth', userAuth)
router.post('/OAuth', oAuth)
router.post('/verify',generateOTP)
router.post('/signup', signUp)
router.post('/login', login)




export default router