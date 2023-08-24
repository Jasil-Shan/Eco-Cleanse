import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Carousal from "./Carousal/Carousal";
import Stats from "./Stats/Stats";
import HeroLeft from "./Hero/HeroLeft";
import HeroRight from "./Hero/HeroRight";
import user from "./assets/user.jpeg";
import collect from './assets/collect.jpeg'
import recycle from './assets/recycle.jpeg'
import Banner from "./Banner/Banner";


const UserHome = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Stats />
            <HeroLeft user={user} />
            <HeroRight collect={collect} />
            <HeroLeft recycle={recycle} last = {true} />

        </>
    );
}




export default UserHome