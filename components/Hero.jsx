"use client";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { heroImageArray } from "@/assets/assets";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Hero = () => {
    const [heroImage, setHeroImage] = useState(0);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroImage(prev =>
                prev === heroImageArray.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!email) return toast.error("Email is Required");

            const sendingFunc = async () => {
                const res = await fetch("/api/email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message);
                }

                return res.json();
            };

            toast.promise(sendingFunc(), {
                loading: "Adding Email...",
                success: (data) => {
                    setEmail("");
                    return data.message;
                },
                error: (error) => error.message
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <motion.div
            initial={{ translateY: "-150%" }}
            animate={{ translateY: "0px" }}
            transition={{ duration: 1, delay: 2 }}
            className="dark:bg-white/20 bg-black/20 my-4 py-2 md:py-10 px-2 xl:px-5 flex max-md:flex-col gap-5 rounded-md w-full"
        >

            <div className="w-full md:w-1/2">
                <motion.div
                    initial={{ translateX: "-120vh", opacity: 0 }}
                    animate={{ translateX: "0px", opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3 }}
                    className="max-[350px]:w-full h-15 w-[95%] sm:w-110 md:w-full max-md:mx-auto sm:min-h-17 md:min-h-27 min-[850px]:min-h-20 lg:min-h-37 xl:min-h-43 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl dark:text-gray-300 text-gray-800 font-extrabold lg:leading-12 xl:leading-13"
                >
                    <span>Blogger is popular because of</span>
                    <TypeAnimation
                        sequence={[
                            " truthfulness",
                            3000,
                            " the latest news",
                            3000,
                            " real stories",
                            3000,
                            " creative ideas",
                            3000,
                            " spreading knowledge",
                            3000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </motion.div>

                <motion.p
                    initial={{ translateX: "-120vh", opacity: 0 }}
                    animate={{ translateX: "0px", opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.15 }}
                    className="max-[350px]:w-full min-[356px]:w-[95%] sm:w-110 md:w-auto max-md:mx-auto dark:text-gray-300 text-gray-800 max-md:text-xs mb-5"
                >
                    Welcome to Blogger, we bring you fresh news, real stories, and insightful ideas from around the world, all in one place. Our goal is to help you stay updated, think better, and explore content that adds real value to your daily life.
                </motion.p>

                <motion.form
                    initial={{ translateX: "-120vh", opacity: 0 }}
                    animate={{ translateX: "0px", opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.2 }}
                    onSubmit={handleSubmit}
                    className="sm:w-110 max-md:mx-auto md:w-full min-[1030px]:w-2/3 xl:w-2/3 pl-1 sm:pl-3 flex gap-1 border dark:border-gray-300 border-gray-800 rounded-full justify-between transition-all duration-300"
                >
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        className="flex-1 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-black/50 font-bold dark:text-gray-300 text-white px-2 sm:px-4 py-2 rounded-r-full cursor-pointer active:scale-95 transition-all duration-200"
                    >
                        Subscribe
                    </button>
                </motion.form>
            </div>

            <motion.div
                initial={{ translateX: "120vh", opacity: 0 }}
                animate={{ translateX: "0px", opacity: 1 }}
                transition={{ duration: 0.5, delay: 3 }}
                className="relative w-full h-60 md:h-auto md:w-1/2"
            >
                {heroImageArray.map((image, i) => (
                    <Image
                        key={i}
                        src={image}
                        alt="Hero Image"
                        className={`absolute w-full h-full object-cover rounded-xl ${heroImage === i ? "opacity-100" : "opacity-0"
                            } transition-all duration-1000`}
                        width={1200}
                        height={1200}
                        loading="eager"
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Hero;