"use client";
import { assets } from "@/assets/assets.js";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const sidebarTabs = [
        { text: "Dashboard", link: "/admin", icon: assets.dashboard_icon },
        { text: "Add Blog", link: "/admin/add-blog", icon: assets.add_icon },
        { text: "Blogs", link: "/admin/blogs", icon: assets.blog_icon },
        { text: "Subscribed", link: "/admin/subscribers", icon: assets.email_icon }
    ];

    return (
        <div className="w-10 sm:w-50 h-screen border-r dark:border-white/50 border-black/50 pt-20 transition-all duration-300">
            {sidebarTabs.map((item) => {
                return (
                    <Link key={item.text} href={item.link} className="dark:bg-white/20 bg-black/20 flex sm:gap-3 mb-3 pl-1 sm:pl-4 py-1 relative cursor-pointer">
                        <Image src={item.icon} alt={item.text} className="w-6 h-6 object-cover dark:invert" width="auto" height="auto" />
                        <p className="font-semibold max-sm:hidden">{item.text}</p>
                        {item.link === pathname && <div className="bg-green-500 h-full -mt-1 rounded-l-xl w-1 sm:w-2 absolute right-0" />}
                    </Link>
                )
            })}
        </div>
    )
};

export default Sidebar;