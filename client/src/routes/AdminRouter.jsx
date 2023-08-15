import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminHomePage from "../pages/Admin/AdminDashboardPage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminWorkersPage from "../pages/Admin/AdminWorkerPage";
import AdminDriversPage from "../pages/Admin/AdminDriversPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AdminWorkPage from "../pages/Admin/AdminWorkPage";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";




function AdminRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes role={'admin'} route={'/admin/login'} />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="work" element={<AdminWorkPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="workers" element={<AdminWorkersPage />} />
                <Route path="drivers" element={<AdminDriversPage />} />
            </Route>
            <Route path="login" element={<AdminLoginPage />} />
        </Routes>
    )
}

export default AdminRouter