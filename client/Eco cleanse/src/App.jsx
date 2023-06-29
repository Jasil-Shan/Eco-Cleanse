import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminLoginPage from './pages/Admin/AdminLoginPage'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
