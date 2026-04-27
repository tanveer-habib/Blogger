"use client";
import { assets } from "@/assets/assets.js";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext.js";

const DashboardCards = () => {
    const { blogs } = useAppContext();
    const blogsNumber = {};
    for (let i = 0; i < blogs.length; i++) {
        if (blogsNumber[blogs[i].category]) {
            blogsNumber[blogs[i].category]++;
        } else {
            blogsNumber[blogs[i].category] = 1;
        };
    };

    const blogsDetail = [
        { text: "Total Blogs", icon: assets.blog_icon, numberValue: blogs.length },
        { text: "Technology Blogs", icon: assets.technology_icon, numberValue: blogsNumber["Technology"] },
        { text: "Start Up Blogs", icon: assets.startUp_icon, numberValue: blogsNumber["Startup"] },
        { text: "Life Style Blogs", icon: assets.lifeStyle_icon, numberValue: blogsNumber["Lifestyle"] }
    ];

    return (
        <div className="flex max-md:flex-wrap sm gap-3 sm:gap-x-1 md:gap-x-3 lg:gap-x-5 mt-4 ml-1 lg:ml-3 pr-2">
            {blogsDetail.map((category) => {
                return <div key={category.text} className="flex border dark:border-white/20 border-black/20 min-w-30 md:w-40 min-h-15 md:h-20 p-1 md:px-2 md:py-1 lg:w-45 lg:h-22 lg:px-3 lg:py-2 rounded-sm shadow-md dark:shadow-white/20 shadow-black/40">
                    <div className="w-1/2 lg:flex-1">
                        <p className="text-[10px] md:text-xs w-[90%] truncate">{category.text}</p>
                        <p className="sm:text-xl sm:font-semibold md:text-2xl md:font-bold mt-2 md:mt-4 lg:mt-5">{category.numberValue || 0}</p>
                    </div>
                    <div className="flex justify-center items-center w-1/2 lg:w-1/3">
                        <div className="dark:bg-white/10 bg-black/10 rounded-full flex justify-center items-center p-1">
                            <Image src={category.icon} alt="blogs_icon" className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 opacity-70 object-cover dark:invert" width="30" height="30" />
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
};

export default DashboardCards;