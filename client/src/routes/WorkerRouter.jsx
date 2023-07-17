import { Route, Routes } from "react-router-dom";
import WorkerLoginPage from "../pages/Worker/WorkerLoginPage";





function WorkerRouter(){
    return(
        <Routes>
            <Route path="login" element={<WorkerLoginPage/>}/>

        </Routes>
    )
}

export default WorkerRouter