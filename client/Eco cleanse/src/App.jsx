import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminLoginPage from './pages/Admin/AdminLoginPage'
import AdminRouter from './routes/adminRouter'
import UserRouter from './routes/userRouter'
import DriverRouter from './routes/driverRouter'
import WorkerRouter from './routes/WorkerRouter'
import axios from 'axios'

function App() {
  axios.defaults.baseURL ="http://localhost:3000" ;
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/admin/*" element={<AdminRouter />}/>


      <Route path='/*' element={<UserRouter/>}/>


      <Route path="/driver/*" element={<DriverRouter />}/>


      <Route path="/worker/*" element={<WorkerRouter />}/>


    </Routes>
  </BrowserRouter>
  )
}

export default App
