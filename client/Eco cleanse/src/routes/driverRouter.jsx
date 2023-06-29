import DriverLoginPage from "../pages/Driver/DriverLoginPage"





function DriverRouter(){
    return(
        <Routes>
            <Route path="login" element={<DriverLoginPage/>}/>

        </Routes>
    )
}

export default DriverRouter