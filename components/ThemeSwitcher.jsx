"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { assets } from "@/assets/assets.js";

const ThemeSwitcher = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Image src={resolvedTheme === "dark" ? assets.sun : assets.moon} alt="sun/moon" className="w-8 h-8 object-cover cursor-pointer" width="auto" height="auto" onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")} />
    )
}

export default ThemeSwitcher;