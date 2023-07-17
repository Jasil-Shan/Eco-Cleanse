import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminWorkersPage from "../pages/Admin/AdminWorkerPage";
import AdminDriversPage from "../pages/Admin/AdminDriversPage";




function AdminRouter(){
    return(
        <Routes>
            <Route path="login" element={<AdminLoginPage/>}/>
            <Route path="home" element={<AdminHomePage/>}/>
            <Route path="users" element={<AdminUsersPage/>}/>
            <Route path="workers" element={<AdminWorkersPage/>}/>
            <Route path="drivers" element={<AdminDriversPage/>}/>
            
        </Routes>
    )
}

export default AdminRouter