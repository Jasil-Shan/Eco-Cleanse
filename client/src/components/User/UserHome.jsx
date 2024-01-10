import React, { Profiler, useEffect } from "react"
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
    const onRenderCallback = (
        id, // unique identifier of the Profiler component
        phase, // either "mount" (if the component just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the set of interactions belonging to this update
    ) => {
        console.log({
            id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
            interactions,
        });
    };

    return (
        <>
            <Profiler id="homeProfiler" onRender={onRenderCallback}>
                <Navbar />
                <Banner />
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 2,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],

                    }}
                    viewport={{ once: true }}>
                    <HeroLeft user={user} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],

                    }}
                    viewport={{ once: true }}>
                    <HeroRight />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],

                    }}
                    viewport={{ once: true }}>
                    <HeroLeft recycle={recycle} last={true} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.50 }}
                    viewport={{ once: true }}>
                    <Stats />
                </motion.div>

                <Footer />
            </Profiler>
        </>
    )
}




export default UserHome