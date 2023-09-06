import express from "express";
import { chats, createChat, findChats, getUser, getWorker } from "../controller/chatController.js";



const router = express.Router()



router.post('/createChat',createChat)


router.get('/:id', chats)
router.get('/getWorker/:id', getWorker)
router.get('/getUser/:id', getUser)
router.get('/find/:firstId/:secondId', findChats);





export default router