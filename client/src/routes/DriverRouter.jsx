import DriverDashPage from "../pages/Driver/DriverDashPage";
import DriverLoginPage from "../pages/Driver/DriverLoginPage"
import { Route, Routes } from "react-router-dom";
import DriverWelcomePage from "../pages/Driver/DriverWelcomePage";
import PrivateRoutes from "../utils/PrivateRoutes";
import DriverProfilePage from "../pages/Driver/DriverProfilePage";
import DriverMapPage from "../pages/Driver/DriverMapPage";
import DriverHistoryPage from "../pages/Driver/DriverHistoryPage";





const DriverRouter = ()=> {

    return (
        <Routes>

            <Route element={<PrivateRoutes role={'driver'} route={'/driver/login'} />}>

                <Route path="dashboard" element={<DriverDashPage />} />
                <Route path="welcome" element={<DriverWelcomePage />} />
                <Route path="profile" element={<DriverProfilePage />} />
                <Route path="map" element={<DriverMapPage />} />
                <Route path="history" element={<DriverHistoryPage />} />

            </Route>

            <Route path="login" element={<DriverLoginPage />} />

        </Routes>
    )
}

export default DriverRouter