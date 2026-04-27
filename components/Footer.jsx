"use client";
import { assets } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="dark:bg-white/20 bg-black/20 mt-15 pt-5">
            <div className="flex max-md:flex-col max-md:justify-between md:items-center px-2 sm:px-5 md:px-8 lg:px-12 xl:px-15 border-b dark:border-white border-black">
                <div className="w-full md:w-1/2">
                    <Link href="/">
                        <Image src={assets.logo} className="w-22 dark:invert sm:w-35 h-6 sm:h-10 object-cover" alt="Site Logo" width="auto" height="auto" />
                    </Link>
                    <p className="max-sm:text-sm my-3 ml-4 sm:ml-8 md:ml-12 w-[95%] md:w-2/3 dark:text-gray-300 text-gray-700">Blogger is a modern blog platform dedicated to sharing truthful stories, fresh ideas, and the latest updates from around the world. Our mission is to provide clear, reliable, and meaningful content that helps readers stay informed, inspired, and connected every day.</p>
                </div>
                <div className="max-md:ml-1 max-sm:text-sm flex gap-x-5 sm:gap-x-10 lg:gap-x-25 dark:text-gray-300 text-gray-700 ">
                    <ul className="flex flex-col gap-y-1 lg:gap-y-2">
                        <li className="font-bold dark:text-white text-black">Mandatory Pages</li>
                        <li><Link href="/">Privacy Policy</Link></li>
                        <li><Link href="/">Terms & Conditions</Link></li>
                        <li><Link href="/">Disclaimer</Link></li>
                        <li><Link href="/">Cookie Policy</Link></li>
                    </ul>
                    <ul className="flex flex-col gap-y-1 lg:gap-y-2">
                        <li className="font-bold dark:text-white text-black">Informational Pages</li>
                        <li><Link href="/">About Us</Link></li>
                        <li><Link href="/">Contact Us</Link></li>
                        <li><Link href="/">Sitemap</Link></li>
                        <li><Link href="/">FAQs</Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-center py-3">Copyright &copy; {new Date().getFullYear()} Tanveer | All Rights Reserved.</div>
        </footer>
    )
}

export default Footer;