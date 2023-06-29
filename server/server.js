import express from 'express'
import dbConnect from './config/config.js'
import path from 'path'
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'





const app = express()

dbConnect()

app.use(express.json) 
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))


app.use('/admin',adminRouter)
app.use('/',userRouter)

app.listen(5000,()=>{
    console.log("server listening on port http://localhost:5000")
})