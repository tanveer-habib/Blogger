"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader.jsx";
import TextEditor from "./TextEditor";

const AddBlog = () => {
    const [form, setForm] = useState({ image: null, title: "", description: "<h2></h2>", category: "" });
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!form.image || !form.title || !form.description || !form.category) {
                toast.error("All filds are required");
                return;
            };
            setLoader(true);

            const formData = new FormData();
            formData.append("image", form.image);
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("category", form.category);


            const addBlog = async () => {
                const res = await fetch("/api/blog", {
                    method: "POST",
                    body: formData
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Something went wrong")
                }
                return res.json();
            };

            toast.promise(addBlog(), {
                loading: "Adding Blog...",
                success: (data) => {
                    setLoader(false);
                    setForm({ image: null, title: "", description: "<h2></h2>", category: "" });
                    return data.message
                },
                error: (error) => {
                    setLoader(false);
                    return error.message
                }
            });

        } catch (error) {
            setLoader(false);
            toast.error(error.message);
        };
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Add New Blog</h1>
            {loader ? <Loader /> :
                <form className="pl-2 sm:pl-5 mt-2" onSubmit={handleSubmit}>
                    <label className="">
                        <p className="my-1">Add Blog Picture</p>
                        <input type="file" className="cursor-pointer" hidden onChange={(e) => { setForm(prev => ({ ...prev, image: e.target.files[0] })) }} />
                        <Image src={form.image ? URL.createObjectURL(form.image) : assets.upload_area} alt="Upload_area_image" loading="eager" className={`w-35 sm:w-45 h-1i sm:h-25 object-cover border dark:border-white/50 border-black/50 rounded-sm ${!form.image ? "dark:invert-80 dark:border-black/50" : ""} cursor-pointer`} width="200" height="100" />
                    </label>
                    <div className="my-4">
                        <p>Title</p>
                        <input type="text" placeholder="Enter Blog Title" name="title" value={form.title} onChange={handleChange} className="border dark:border-white/50 border-black/50 focus:outline-none px-2 py-1 rounded-sm" />
                    </div>
                    <div>
                        <p>Description</p>
                        <TextEditor form={form} setForm={setForm} />
                    </div>
                    {/* <div>
                        <p>Description</p>
                        <textarea placeholder="Enter Blog Description" rows="5" name="description" value={form.description} onChange={handleChange} className="w-[95%] sm:w-95 border dark:border-white/50 border-black/50 focus:outline-none px-2 py-1 rounded-sm" />
                    </div> */}
                    <select className="focus:outline-none cursor-pointer border dark:border-white/50  border-black/50 px-3 py-1 rounded-sm my-3" onChange={handleChange} name="category" value={form.category}>
                        <option value="" className="dark:text-black">Select Category</option>
                        <option value="Lifestyle" className="dark:text-black">LifeStyle</option>
                        <option value="Technology" className="dark:text-black">Technology</option>
                        <option value="Startup" className="dark:text-black">Start Up</option>
                    </select>
                    <button type="submit" className="px-5 py-1 rounded-sm border dark:border-white/50 border-black/50 block mt-4 font-semibold dark:bg-white/20 bg-black/20 hover:cursor-pointer">Save Blog</button>
                </form>
            }
        </div>
    )
};

export default AddBlog;