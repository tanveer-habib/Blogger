import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    try {
        const form = await req.json();

        if (!form.email || !form.password) {
            return res.json({ success: false, message: "All fields are required" }, { status: 400 });
        };

        if (form.email != process.env.ADMIN_EMAIL || form.password != process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Please enter valid data" }, { status: 400 });
        };

        const token = jwt.sign({ email: form.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const res = NextResponse.json({ success: true, message: "Logged In" }, { status: 201 });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 3600,
        });

        return res;
    } catch (error) {
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};