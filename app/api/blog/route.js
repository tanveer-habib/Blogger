import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db.js";
import Blog from "@/models/Blog.js";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export const POST = async (req) => {
    try {
        await connectDB();
        const formData = await req.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const category = formData.get("category");

        if (!title || !description || !image || !category) {
            return res.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        };

        const imageBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);
        const imageTime = Date.now();
        const filePath = path.join(process.cwd(), "public", `${imageTime}_${image.name}`);

        await writeFile(filePath, buffer);

        await Blog.create({
            title,
            description,
            image: `/${imageTime}_${image.name}`,
            category,
            author: "Milson Doe",
            authorImage: "/profile_icon.png",
        });
        return res.json({ success: true, message: "Blog added" }, { status: 201 });
    } catch (error) {
        console.log("POST Route error ", error.message);
        return res.json({ success: false, message: error.message }, { status: 400 });
    };
};

export const GET = async (req) => {
    try {
        await connectDB();
        const blogs = await Blog.find({});
        return res.json({ success: true, blogs: blogs.length > 0 ? blogs : [] }, { status: 200 });
    } catch (error) {
        return res.json({ success: false, message: error.message }, { status: 400 });
    };
};

export const DELETE = async (req) => {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return res.json({ success: false, message: "ID is not comming " }, { status: 400 });
        }

        const blog = await Blog.findById(id);
        await unlink(path.join(process.cwd(), "/public", blog.image));

        await Blog.findByIdAndDelete(id);
        return res.json({ success: true, message: "Blog Deleted" }, { status: 201 });
    } catch (error) {
        console.log("Blog Delete Route Error ", error.message);
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};