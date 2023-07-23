import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from "../pages/User/UserSignupPage";
import VerifyEmailPage from "../pages/User/VerifyEmailPage";
import HomePage from "../pages/Home/HomePage";
import UserHomePage from "../pages/User/UserHomePage";
import UserProfilePage from "../pages/User/UserProfilePage";
import UserBookingPage from "../pages/User/UserBookingPage";
import PrivateRoutes from "../utils/PrivateRoutes";





function UserRouter(){
    return(
        <Routes>
            <Route element = {<PrivateRoutes role={'user'} route={'/login'}/>}>
                
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="booking" element={<UserBookingPage />} />

            </Route>

            <Route path="login" element={<UserLoginPage/>}/>
            <Route path="signup" element={<UserSignupPage/>}/>
            <Route path="verifyMail" element={<VerifyEmailPage />} />
            
            <Route path="" element={<UserHomePage />} />
        </Routes>
    )
}

export default UserRouter