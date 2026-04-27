"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

const DetailPage = ({ blog }) => {
    const description = DOMPurify.sanitize(blog.description);

    return (
        <div className="dark:text-gray-300 text-gray-700 text-center sm:px-4 md:px-8 lg:px-12 xl:px-15">
            <div className="min-h-[60vh] pt-15 dark:bg-white/20 bg-black/20 rounded-lg pb-30">
                <motion.h1 initial={{ translateY: "-100vh" }} animate={{ translateY: "0px", transition: { duration: 1, delay: 0.8 } }} className="max-sm:px-3 text-2xl sm:text-3xl md:text-4xl w-full sm:w-2/3 lg:w-1/2 mx-auto font-extrabold">{blog.title}</motion.h1>
                <motion.div initial={{ translateY: "-100vh" }} animate={{ translateY: "0px", transition: { duration: 1, delay: 0.5 } }}>
                    <Image src="/profile_icon.png" alt="Author_image" className="w-17 mx-auto mt-10 mb-1 border dark:border-white border-black rounded-full" width="100" height="100" loading="eager" />
                </motion.div>
                <motion.h2 initial={{ translateY: "-100vh" }} animate={{ translateY: "0px", transition: { duration: 1, delay: 0.2 } }} className="text-xl">{blog.author}</motion.h2>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 2 } }}>
                <Image src={blog.image} alt="blog_Propile_picture" className="w-80 sm:w-120 -mt-25 mx-auto rounded-lg" width="1200" height="1200" />
            </motion.div>
            <div className="text-start px-5 sm:px-10 md:px-20 lg:px-30 xl:px-40 mt-5 ownString" dangerouslySetInnerHTML={{ __html: description }}>
            </div>
        </div>
    )
};

export default DetailPage;