import { Route, Routes } from "react-router-dom";





function WorkerRouter(){
    return(
        <Routes>
            <Route path="login" element={<DriverLoginPage/>}/>

        </Routes>
    )
}

export default WorkerRouter