import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";





function UserRouter(){
    return(
        <Routes>
            <Route path="login" element={<UserLoginPage/>}/>
        </Routes>
    )
}

export default UserRouter