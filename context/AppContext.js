"use client";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) { };
    };

    const checkAdmin = async () => {
        try {
            const res = await fetch("/api/isAdmin");
            const data = await res.json();
            if (data.success) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            };
        } catch (error) { };
    };

    useEffect(() => {
        getBlogs();
        checkAdmin();
    }, []);

    const value = {
        isAdmin, setIsAdmin,
        blogs,
        getBlogs
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
};

export const useAppContext = () => {
    return useContext(AppContext);
};