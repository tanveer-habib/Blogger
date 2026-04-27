"use client";
import { useState } from "react";
import ConfirmCard from "../ConfirmCard.jsx";
import toast from "react-hot-toast";

const EmailList = ({ emails }) => {
    const [emailsArray, setEmailsArray] = useState(emails);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setId] = useState(null);

    const handleDelete = async () => {
        try {
            const deleteFunc = async () => {
                const res = await fetch("/api/email", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || "Somthing went wrong");
                };
                return res.json();
            }

            toast.promise(deleteFunc(), {
                loading: "Deleting Email...",
                success: (data) => {
                    setEmailsArray((prev) => (
                        prev.filter((email) => email._id != id)
                    ));
                    setId(null);
                    setShowConfirm(false);
                    return data.message;
                },
                error: (error) => error.message
            })
        } catch (error) {
            toast.error(error.message);
        };
    };

    return showConfirm ? <ConfirmCard setId={setId} setShowConfirm={setShowConfirm} handleDelete={handleDelete} /> : (
        <div>
            <h1 className="text-2xl font-bold">All Blogs</h1>
            {emailsArray.length > 0 ?
                <table className="ml-2 lg:ml-5 mt-2 mr-2 lg:mr-5 rounded-sm overflow-hidden">
                    <thead className="dark:bg-white/20 bg-black/20">
                        <tr>
                            <th className="w-10 max-md:text-sm md:w-15 border dark:border-white/50 border-black/50">S.No</th>
                            <th className="text-start pl-2 sm:pl-5 border dark:border-white/50 border-black/50">Email</th>
                            <th className="w-22 md:w-25 lg:w-45 border dark:border-white/50 border-black/50 max-sm:hidden">Created at</th>
                            <th className="w-15 border dark:border-white/50 border-black/50">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailsArray.map((email, i) => {
                            return <tr key={email._id}>
                                <td className="border dark:border-white/50 border-black/50 text-center">{i + 1}</td>
                                <td className="border dark:border-white/50 border-black/50 px-1 sm:px-2 py-1">
                                    <p className="w-28 min-[375px]:w-35 min-[490px]:w-40 sm:w-30 md:w-50 lg:w-90 xl:w-120 truncate text-xs sm:text-shadow-mauve-200 md:text-base font-semibold">{email.email}</p>
                                </td>
                                <td className="max-md:text-xs border dark:border-white/50 border-black/50 text-center font-semibold max-sm:hidden">{new Date(email.createdAt).toLocaleDateString()}</td>
                                <td className="border dark:border-white/50 border-black/50 text-center font-semibold text-red-500 text-xl rotate-x-45 cursor-pointer" onClick={() => {
                                    setId(email._id);
                                    setShowConfirm(true);
                                }}>X</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                : <p className="mt-5 ml-5 text-xl font-bold dark:text-gray-400 text-gray-700">There is nothing to show</p>}
        </div>
    )
};

export default EmailList;