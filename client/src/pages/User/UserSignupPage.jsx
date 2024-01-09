import UserSignup from "../../components/User/UserSignup"

import { motion } from "framer-motion"



const UserSignupPage = () => {

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.8,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <UserSignup />
            </motion.div>
        </>
    )

}

export default UserSignupPage