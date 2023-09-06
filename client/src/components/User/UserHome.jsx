import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Carousal from "./Carousal/Carousal";
import Stats from "./Stats/Stats";
import HeroLeft from "./Hero/HeroLeft";
import HeroRight from "./Hero/HeroRight";
import user from "./assets/user.jpeg";
import recycle from './assets/recycle.jpeg'
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";


const UserHome = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <HeroLeft user={user} />
            <HeroRight />
            <HeroLeft recycle={recycle} last = {true} />
            <Stats />
            <Footer />
        </>
    );
}




export default UserHome