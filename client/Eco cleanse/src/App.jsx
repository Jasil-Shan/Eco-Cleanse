import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminLoginPage from './pages/Admin/AdminLoginPage'
import AdminRouter from './routes/adminRouter'
import UserRouter from './routes/userRouter'

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/admin/*" element={<AdminRouter />}/>


      <Route path='/' element={<UserRouter/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
