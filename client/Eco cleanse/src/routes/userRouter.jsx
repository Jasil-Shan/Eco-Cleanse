import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import VerifyEmailPage from "../pages/User/VerifyEmailPage";





function UserRouter(){
    return(
        <Routes>
            <Route path="login" element={<UserLoginPage/>}/>
            <Route path="signup" element={<UserSignupPage/>}/>
            <Route path="verifyMail" element={<VerifyEmailPage />} />

        </Routes>
    )
}

export default UserRouter