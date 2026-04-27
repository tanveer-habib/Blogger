import connectDB from "./db";
import Blog from "@/models/Blog";

export const fetchBlog = async (id) => {
    try {
        await connectDB();
        let blog = await Blog.findById(id).lean();
        blog = { ...blog, _id: blog._id.toString() };

        return blog;
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchBlogs = async () => {
    try {
        await connectDB();
        const blogs = await Blog.fidn().lean();
        return blogs.map((blog) => ({
            ...blog, _id: blog._id.toString()
        }));
    } catch (error) { };
};