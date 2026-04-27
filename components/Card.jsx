"use client";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Card = ({ blog, i }) => {
    const [isClient, setIsClient] = useState(false);
    const description = DOMPurify.sanitize(blog.description)

    useEffect(() => {
        setIsClient(true);
    }, []);

    return blog && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 0.5, delay: Number(`1.${i}`) } }} viewport={{ once: true }} className="border dark:border-white/20 border-black/20 rounded-xl p-2 dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10">
            <Link href={`blog/${blog._id}`}>
                <Image src={blog.image} alt={blog.title} width="200" height="200" className="w-auto h-auto rounded-xl cursor-pointer hover:scale-105 transition-all duration-300" />
            </Link>
            <h2 className="font-bold max-w-full truncate my-2">{blog.title}</h2>
            {isClient && <p className="text-xs dark:text-gray-300 text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: description.slice(0, 130) }} />}
            <Link href={`blog/${blog._id}`} className="text-xs font-semibold px-2 py-1 border border-gray-500 rounded-lg cursor-pointer">See more...</Link>
        </motion.div>
    )
}

export default Card;