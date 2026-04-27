import connectDB from "@/lib/db";
import Email from "@/models/Email";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();
        const { email } = await req.json();
        if (!email) {
            return res.json({ success: false, message: "Email is Required" }, { status: 400 })
        };

        const alreadyStored = await Email.findOne({ email })
        if (alreadyStored) {
            return res.json({ success: false, message: "Email Already Stored" }, { status: 400 });
        }

        await Email.create({ email });

        return res.json({ success: true, message: "Email Added" }, { status: 201 });
    } catch (error) {
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};

export const DELETE = async (req) => {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return res.json({ success: false, message: "ID is Required" }, { status: 400 });
        };

        await Email.findByIdAndDelete(id);
        return res.json({ success: true, message: "Email Deleted" }, { status: 201 });
    } catch (error) {
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};