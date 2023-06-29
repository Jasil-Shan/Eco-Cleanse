import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";




function AdminRouter(){
    return(
        <Routes>
            <Route path="login" element={<AdminLoginPage/>}/>
        </Routes>
    )
}

export default AdminRouter