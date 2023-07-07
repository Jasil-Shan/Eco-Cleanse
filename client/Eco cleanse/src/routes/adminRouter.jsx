import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminHomePage from "../pages/Admin/AdminHomePage";




function AdminRouter(){
    return(
        <Routes>
            <Route path="login" element={<AdminLoginPage/>}/>
            <Route path="home" element={<AdminHomePage/>}/>

        </Routes>
    )
}

export default AdminRouter