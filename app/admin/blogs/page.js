import BlogList from "@/components/Admin/BlogsList.jsx";

const BlogPage = async () => {
    return (
        <BlogList />
    );
};

export default BlogPage;

export const metadata = {
    title: "Blogger - Blogs List",
    description: "Blogger - This page shows all blogs"
};