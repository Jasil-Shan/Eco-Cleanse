import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminWorkersPage from "../pages/Admin/AdminWorkerPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AdminWorkPage from "../pages/Admin/AdminWorkPage";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import AdminDataTablePage from "../pages/Admin/AdminDataTablePage";
import AdminPaymentPage from "../pages/Admin/AdminPaymentPage";
import AdminGarbageReport from "../components/Admin/AdminGarbageReport";




function AdminRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes role={'admin'} route={'/admin/login'} />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="work" element={<AdminWorkPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="workers" element={<AdminWorkersPage />} />
                <Route path="details" element={<AdminDataTablePage />} />
                <Route path="payment" element={<AdminPaymentPage />} />
                <Route path="garbageReport" element={<AdminGarbageReport />} />
            </Route>
            <Route path="login" element={<AdminLoginPage />} />
        </Routes>
    )
}

export default AdminRouter