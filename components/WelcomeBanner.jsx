"use client"
import { motion } from "framer-motion";

const WelcomeBanner = () => {
    return (
        <motion.div animate={{ translateY: "-100%", transition: { duration: 1, delay: 1.5 } }} className="absolute w-screen h-screen inset-0 z-50  dark:bg-black bg-white flex justify-center items-center dark:text-gray-100 text-gray-800 text-4xl font-semiblod border-b dark:border-white border-black">
            Welcome to <span className="font-extrabold dark:text-white text-black ml-2 border-b dark:border-white border-black pb-1 -mb-2"> Blogger</span>
        </motion.div>
    )
};

export default WelcomeBanner;