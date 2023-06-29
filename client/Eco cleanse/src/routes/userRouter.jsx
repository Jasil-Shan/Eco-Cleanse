import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";





function UserRouter(){
    return(
        <Routes>
            <Route path="login" element={<UserLoginPage/>}/>
            <Route path="signup" element={<UserSignupPage/>}/>

        </Routes>
    )
}

export default UserRouter