import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) {
            return res.json({ success: false }, { status: 400 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isEmailMatched = decoded.email === process.env.ADMIN_EMAIL;
        if (!isEmailMatched) {
            return res.json({ success: false }, { status: 400 });
        }

        return res.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log("isAuth Route error is ", error.message);
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};