import { Route, Routes } from "react-router-dom";
import WorkerLoginPage from "../pages/Worker/WorkerLoginPage";
import WorkerDashPage from "../pages/Worker/WorkerDashPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import WorkerTaskViewPage from "../pages/Worker/WorkerTaskViewPage";





function WorkerRouter() {
    return (
        <Routes>

            <Route element={<PrivateRoutes role={'worker'} route={'/worker/login'} />}>

                <Route path="dashboard" element={<WorkerDashPage />} />
                <Route path="taskView" element={<WorkerTaskViewPage />} />
                
            </Route>

            <Route path="login" element={<WorkerLoginPage />} />

        </Routes>
    )
}

export default WorkerRouter