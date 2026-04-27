"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";

const LoginForm = ({ setIsLoginForm }) => {
    const [form, setForm] = useState({ email: "tanveer@gmail.com", password: "tanveer123" });
    const router = useRouter();
    const { setIsAdmin } = useAppContext();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const loginFunc = async () => {
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || "Something went wrong");
                };
                return res.json();
            };

            toast.promise(loginFunc(), {
                loading: "Logging In...",
                success: (data) => {
                    setForm({ email: "", password: "" });
                    setIsLoginForm(false);
                    router.push("/admin")
                    setIsAdmin(true);
                    return data.message;
                },
                error: (error) => error.message
            })
        } catch (error) {
            toast.error(error.message);
        };
    };

    const handleClose = () => {
        setIsLoginForm(false);
    }

    return (
        <div className="fixed z-20 inset-0 bg-black/20 backdrop-blur-sm flex justify-center pt-20" onClick={handleClose}>
            <div className="relative h-max bg-white border border-black/50 px-7 py-10 rounded-md shadow-xl shadow-black" onClick={(e) => e.stopPropagation()}>
                <p className="absolute top-1 right-3 rotate-x-40 text-3xl cursor-pointer" onClick={handleClose}>x</p>
                <h2 className="text-2xl font-semibold text-gray-500"><span className="text-black">Admin </span>Login Form</h2>
                <form className="dark:text-gray-800" onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <p>Email</p>
                        <input type="email" placeholder="Enter email" required name="email" onChange={handleChange} value={form.email} className="border border-black/20 px-2 py-1 rounded-sm focus:border-black focus:outline-none" />
                    </div>
                    <div className="my-5">
                        <p>Password</p>
                        <input type="password" placeholder="Enter password" required name="password" onChange={handleChange} value={form.password} className="border border-black/20 px-2 py-1 rounded-sm focus:border-black focus:outline-none" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="font-semibold bg-black/30 px-5 py-1.5 rounded-sm cursor-pointer" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default LoginForm;