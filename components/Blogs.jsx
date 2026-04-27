"use client";
import { useState } from "react";
import Card from "@/components/Card.jsx";
import { useAppContext } from "@/context/AppContext.js";

const Blogs = () => {
    const { blogs } = useAppContext();
    const [tab, setTab] = useState("All");

    return (
        <div className="mt-20">
            <div className="flex justify-center mb-10">
                <ul className="flex gap-1 sm:gap-5 text-sm sm:text-base">
                    <li className={`cursor-pointer ${tab === "All" ? "dark:bg-white/20 bg-black/20 border-b dark:border-white border-black" : ""} px-2 py-0.5 transition-all duration-200`} onClick={() => setTab("All")}>All</li>
                    <li className={`cursor-pointer ${tab === "Lifestyle" ? "dark:bg-white/20 bg-black/20 border-b dark:border-white border-black" : ""} px-2 py-0.5 transition-all duration-200`} onClick={() => setTab("Lifestyle")}>LifeStyle</li>
                    <li className={`cursor-pointer ${tab === "Technology" ? "dark:bg-white/20 bg-black/20 border-b dark:border-white border-black" : ""} px-2 py-0.5 transition-all duration-200`} onClick={() => setTab("Technology")}>Technology</li>
                    <li className={`cursor-pointer ${tab === "Startup" ? "dark:bg-white/20 bg-black/20 border-b dark:border-white border-black" : ""} px-2 py-0.5 transition-all duration-200`} onClick={() => setTab("Startup")}>Start Up</li>
                </ul>
            </div>

            <div className="grid gap-3 md:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {blogs?.length > 0 && blogs.filter((blog) => tab === "All" ? true : blog.category === tab).map((blog, i) => {
                    return <Card key={blog._id} blog={blog} i={i} />
                })}
            </div>

        </div>
    )
}

export default Blogs;