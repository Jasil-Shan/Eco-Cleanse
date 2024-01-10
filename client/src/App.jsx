import { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLoginPage from './pages/Admin/AdminLoginPage'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserRouter from './routes/UserRouter';
import DriverRouter from './routes/DriverRouter';
import WorkerRouter from './routes/WorkerRouter';
import AdminRouter from './routes/AdminRouter';
import { BeatLoader } from 'react-spinners';

const LazyUserRoutes = lazy(() => import("./routes/UserRouter"));


function App() {
  axios.defaults.baseURL ="https://ecocleanse.comicworld.store"
  // axios.defaults.baseURL = "http://localhost:3000"
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />

        <Route path="/*" element={<Suspense fallback={<BeatLoader color="#36d7b7" />}>
          <LazyUserRoutes />
        </Suspense>
        }
        />
        <Route path="/driver/*" element={<DriverRouter />} />


        <Route path="/worker/*" element={<WorkerRouter />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
