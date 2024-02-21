import express from 'express'
import dbConnect from './config/config.js'
import path from 'path'
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import workerRouter from './routes/workerRouter.js'
import driverRouter from './routes/driverRouter.js'
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors'
import 'dotenv/config.js'
import cookieParser from 'cookie-parser'
import http from "http"
import { Server } from 'socket.io'

const app = express()

dbConnect()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["https://ecocleanse.netlify.app","http://localhost:5000", "http://ecocleanse.surge.sh" ]
  },
});

let acitveUsers = []

io.on("connection",(socket)=>{
  console.log('hello');
  socket.on("new-user-add", (newUserId) => {
    if (!acitveUsers.some((user) => user.userId === newUserId)) {
      acitveUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", acitveUsers);
  });

  socket.on("disconnect", () => {
    acitveUsers = acitveUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", acitveUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = acitveUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
})


app.use(
    cors({
      origin: [
        "https://ecocleanse.netlify.app",
        "http://localhost:5000",
        "http://ecocleanse.surge.sh",
      ],
      credentials: true,
    })
  );


app.use(express.json({ limit: "50mb" }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('/admin', adminRouter)
app.use('/', userRouter)
app.use('/user', authRouter)
app.use('/worker', workerRouter)
app.use('/driver', driverRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)

app.use(mongoSanitize());


server.listen(3000,()=>{
  console.log("server running on port 3000");
})