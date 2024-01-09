import React, { useEffect } from "react"
import Navbar from "./Navbar/Navbar"
import Stats from "./Stats/Stats"
import HeroLeft from "./Hero/HeroLeft"
import HeroRight from "./Hero/HeroRight"
import user from "./assets/user.jpeg"
import recycle from './assets/recycle.jpeg'
import Banner from "./Banner/Banner"
import Footer from "./Footer/Footer"
import { motion } from "framer-motion"


const UserHome = () => {
    return (
        <>
            <Navbar />
            <Banner />

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5,delay:0.35,ease: [0, 0.81, 0.2, 1.01]}}
                viewport={{ once: true }}>
                <HeroLeft user={user} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5,delay:0.35,ease: [0, 0.81, 0.2, 1.01]}}
                viewport={{ once: true }}>
                <HeroRight />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5,delay:0.35,ease: [0, 0.81, 0.2, 1.01]}}
                viewport={{ once: true }}>
                <HeroLeft recycle={recycle} last={true} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 , delay:0.50 }}
                viewport={{ once: true }}>
                <Stats />
            </motion.div>

            <Footer />
        </>
    )
}




export default UserHome