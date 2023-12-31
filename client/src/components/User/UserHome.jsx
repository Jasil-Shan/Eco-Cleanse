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
import { motion } from "framer-motion"


const UserHome = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8,delay:0.25 }}
                viewport={{ once: true }}>
                <HeroLeft user={user} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay:0.25 }}
                viewport={{ once: true }}>
                <HeroRight />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay:0.25 }}
                viewport={{ once: true }}>
                <HeroLeft recycle={recycle} last={true} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 , delay:0.25 }}
                viewport={{ once: true }}>
                <Stats />
            </motion.div>

            <Footer />
        </>
    );
}




export default UserHome