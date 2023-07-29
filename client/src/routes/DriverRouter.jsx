import DriverDashPage from "../pages/Driver/DriverDashPage";
import DriverLoginPage from "../pages/Driver/DriverLoginPage"
import { Route, Routes } from "react-router-dom";
import DriverWelcomePage from "../pages/Driver/DriverWelcomePage";





function DriverRouter(){
    return(
        <Routes>
            <Route path="login" element={<DriverLoginPage/>}/>
            <Route path="dashboard" element={<DriverDashPage/>}/>
            <Route path="welcome" element={<DriverWelcomePage/>}/>
        </Routes>
    )
}

export default DriverRouter