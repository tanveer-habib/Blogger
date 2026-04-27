"use client";
import Navbar from "@/components/Navbar.jsx";
import Sidebar from "@/components/Admin/Sidebar.jsx";
import { useAppContext } from "@/context/AppContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootLayout({ children }) {
    const { isAdmin } = useAppContext();
    const [seconds, setSeconds] = useState(5);
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            setTimeout(() => {
                router.push("/");
            }, 5000)
        };

        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000);

        return () => clearInterval(interval);
    }, [isAdmin]);

    return (
        isAdmin ? <>
            <Navbar />
            <div className="flex gap-x-2">
                <Sidebar />
                <div className="pt-20 pl-2 sm:pl-5 pb-5 max-h-screen flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </> : (<div className="h-screen text-center text-4xl flex flex-col gap-5 justify-center items-center">
            <h1>You Are not logged In please Log in first.</h1>
            <div>{seconds}</div>
        </div>)
    );
}
