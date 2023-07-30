import DriverDashPage from "../pages/Driver/DriverDashPage";
import DriverLoginPage from "../pages/Driver/DriverLoginPage"
import { Route, Routes } from "react-router-dom";
import DriverWelcomePage from "../pages/Driver/DriverWelcomePage";
import PrivateRoutes from "../utils/PrivateRoutes";





function DriverRouter() {
    return (
        <Routes>

            <Route element={<PrivateRoutes role={'driver'} route={'/driver/login'} />}>

                <Route path="dashboard" element={<DriverDashPage />} />
                <Route path="welcome" element={<DriverWelcomePage />} />

            </Route>

            <Route path="login" element={<DriverLoginPage />} />

        </Routes>
    )
}

export default DriverRouter