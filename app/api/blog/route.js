import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db.js";
import Blog from "@/models/Blog.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "@/lib/cloudinary";

export const POST = async (req) => {
    try {
        await connectCloudinary();
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

        const uploadResult = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream({ folder: "blogger" }, (error, uploadResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(uploadResult);
            }).end(buffer);
        });

        await Blog.create({
            title,
            description,
            image: uploadResult.secure_url,
            imageId: uploadResult.public_id,
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
        await connectCloudinary();
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return res.json({ success: false, message: "ID is not comming " }, { status: 400 });
        }

        const blog = await Blog.findById(id);
        await cloudinary.uploader.destroy(blog.imageId);

        await Blog.findByIdAndDelete(id);
        return res.json({ success: true, message: "Blog Deleted" }, { status: 201 });
    } catch (error) {
        console.log("Blog Delete Route Error ", error.message);
        return res.json({ success: false, message: error.message }, { status: 500 });
    };
};