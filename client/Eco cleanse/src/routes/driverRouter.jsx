import DriverLoginPage from "../pages/Driver/DriverLoginPage"
import { Route, Routes } from "react-router-dom";





function DriverRouter(){
    return(
        <Routes>
            <Route path="login" element={<DriverLoginPage/>}/>

        </Routes>
    )
}

export default DriverRouter