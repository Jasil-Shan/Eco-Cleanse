import express from 'express'
import dbConnect from './config/config.js'
import path from 'path'
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import workerRouter from './routes/workerRouter.js'
import driverRouter from './routes/driverRouter.js'
import cors from 'cors'
import 'dotenv/config.js'

import cookieParser from 'cookie-parser'





const app = express()

app.use(
    cors({
      origin: [
        "http://localhost:5000",
      ],
      credentials: true,
    })
  );

dbConnect()

app.use(express.json({limit:"50mb"})) 
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))


app.use('/admin',adminRouter)
app.use('/',userRouter)
app.use('/user',authRouter)
app.use('/worker',workerRouter)
app.use('/driver',driverRouter)


app.listen(3000,()=>{
    console.log("server listening on port http://localhost:3000")
})
