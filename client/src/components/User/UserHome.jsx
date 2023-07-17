import React from "react";
import Navbar from "./Navbar/Navbar";
import Carousal from "./Carousal/Carousal";
import Stats from "./Stats/Stats";
import HeroLeft from "./Hero/HeroLeft";
import HeroRight from "./Hero/HeroRight";
import user from "./assets/user.jpeg";
import collect from './assets/collect.jpeg'
import recycle from './assets/recycle.jpeg'


const UserHome = () => {

    return (
        <> 
            <Navbar />
            <Carousal />
            <Stats />
            <HeroLeft user = {user}/>
            <HeroRight collect = {collect} />
            <HeroLeft recycle = {recycle}/>

            
        </>
    );
}




export default UserHome