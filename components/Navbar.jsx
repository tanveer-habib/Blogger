"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoginForm from "./Admin/LoginForm.jsx";
import { useAppContext } from "@/context/AppContext.js";

const Navbar = () => {
    const pathname = usePathname();
    const adminRout = pathname.includes("/admin");
    const [showNav, setShowNav] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);
    const [isLoginForm, setIsLoginForm] = useState(false);
    const router = useRouter();
    const { isAdmin } = useAppContext();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 && window.scrollY > lastScroll) {
                setShowNav(false);
            } else {
                setShowNav(true);
            };
            setLastScroll(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    return (
        <>
            <header className={`fixed top-0 left-0 z-10 backdrop-blur-sm dark:bg-black/50 w-full transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
                <nav className="flex px-2 md:px-10 lg:px-12 xl:px-15 justify-between items-center dark:bg-white/20 bg-black/20 py-2 border-b border-black/80 dark:border-white/50" >
                    <Link href="/">
                        <Image src={assets.logo} alt="logo" className="w-20 sm:w-26 md:w-35 dark:invert transition-all duration-300" width="auto" height="auto" loading="eager" />
                    </Link>
                    <div className="flex items-center gap-x-5" >
                        {!adminRout && <button onClick={() => isAdmin ? router.push("/admin") : setIsLoginForm(true)} className="text-sm border dark:border-white/50 border-black/50 px-5 py-1 rounded-full cursor-pointer">Dashboard</button>}
                        <ThemeSwitcher />
                    </div>
                </nav>
            </header>
            {isLoginForm && <LoginForm setIsLoginForm={setIsLoginForm} />}
        </>
    )
}

export default Navbar;