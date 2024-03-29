import { Route, Routes } from "react-router-dom";
import WorkerLoginPage from "../pages/Worker/WorkerLoginPage";
import WorkerDashPage from "../pages/Worker/WorkerDashPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import WorkerProfilePage from "../pages/Worker/WorkerProfilePage";
import DriverHistoryPage from "../pages/Driver/DriverHistoryPage";
import ChatPage from "../pages/Chat/ChatPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";





const  WorkerRouter = ()=> {
    return (
        <Routes>

            <Route element={<PrivateRoutes role={'worker'} route={'/worker/'} />}>

                <Route path="dashboard" element={<WorkerDashPage />} />
                <Route path="profile" element={<WorkerProfilePage />} />
                <Route path="history" element={<DriverHistoryPage />} />
                <Route path="chat" element={<ChatPage />} />
\
            </Route>

            <Route path="/" element={<WorkerLoginPage />} />

        </Routes>
    )
}

export default WorkerRouter