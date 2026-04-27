"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "../Loader.jsx";
import { useState } from "react";
import ConfirmCard from "../ConfirmCard.jsx";
import { useAppContext } from "@/context/AppContext.js";
import DOMPurify from "dompurify";

const Bloglist = () => {
    const { blogs } = useAppContext();
    const [blogsArray, setBlogsArray] = useState(blogs);
    const [loader, setLoader] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setId] = useState(null);

    const handleDelete = async () => {
        try {
            setLoader(true);
            const deleteFunc = async () => {
                const res = await fetch("/api/blog", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || "Somethin went wrong");
                };

                return res.json();
            };

            toast.promise(deleteFunc(), {
                loading: "Deleting Blog...",
                success: (data) => {
                    setLoader(false);
                    setBlogsArray((prev) => (
                        prev.filter((b) => b._id != id)
                    ));
                    setShowConfirm(false);
                    setId(null);
                    return data.message
                },
                error: (error) => {
                    setLoader(false);
                    return error.message
                }
            });
        } catch (error) {
            toast.error(error.message);
        };
    };

    return (
        <div>
            {showConfirm && <ConfirmCard setId={setId} handleDelete={handleDelete} setShowConfirm={setShowConfirm} />}
            <h1 className="text-2xl font-bold">All Blogs</h1>
            {loader ? <Loader /> : (
                blogsArray.length > 0 ? (
                    <table className="ml-2 lg:ml-5 mt-2 mr-2 lg:mr-5 rounded-sm overflow-hidden">
                        <thead className="dark:bg-white/20 bg-black/20">
                            <tr>
                                <th className="w-10 max-md:text-sm md:w-15 border dark:border-white/50 border-black/50">S.No</th>
                                <th className={`text-start pl-2 sm:pl-5 border dark:border-white/50 border-black/50 ${blogs.length < 1 && "sm:min-w-80"}`}>Blog</th>
                                <th className="w-22 md:w-25 lg:w-45 border dark:border-white/50 border-black/50 max-sm:hidden">Created at</th>
                                <th className="w-15 border dark:border-white/50 border-black/50">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogsArray.map((blog, i) => {
                                return <tr key={blog._id}>
                                    <td className="border dark:border-white/50 border-black/50 text-center">{i + 1}</td>
                                    <td className="border dark:border-white/50 border-black/50 px-1 sm:px-2 py-1">
                                        <div className="flex gap-x-1 sm:gap-x-2">
                                            <Image src={blog.image} alt="Blog Image" className="w-12 min-[400px]:w-14 sm:w-18 h-8 sm:h-12 object-cover rounded-sm" width="100" height="80" loading={`${i == 0 ? "eager" : "lazy"}`} />
                                            <div className="">
                                                <h3 className="w-28 min-[375px]:w-35 min-[490px]:w-40 sm:w-30 md:w-50 lg:w-90 xl:w-120 truncate text-xs sm:text-shadow-mauve-200 md:text-base font-semibold">{blog.title}</h3>
                                                <div className="max-h-5 overflow-y-hidden w-25 min-[375px]:w-30 min-[490px]:w-35 sm:w-25 md:w-45 lg:w-85 xl:w-110 truncate text-[10px] sm:text-xs md:text-sm dark:text-gray-400 text-gray-800" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="max-md:text-xs border dark:border-white/50 border-black/50 text-center font-semibold max-sm:hidden">{new Date(blog.date).toLocaleDateString()}</td>
                                    <td className="border dark:border-white/50 border-black/50 text-center font-semibold text-red-500 text-xl rotate-x-45 cursor-pointer" onClick={() => { setShowConfirm(true); setId(blog._id) }} >X</td>
                                </tr>
                            })}
                        </tbody>
                    </table>) : (<p className="mt-5 ml-5 text-xl font-bold dark:text-gray-400 text-gray-700">There is nothing to show</p>)
            )}
        </div>
    )
};

export default Bloglist;