import DetailPage from "@/components/DetailBlog.jsx";
import Loader from "@/components/Loader.jsx";
import { fetchBlog } from "@/lib/blogsController";

const BlogDetailPage = async ({ params }) => {
    const { id } = await params;
    const blog = await fetchBlog(id);
    return blog ? (
        <div className="mt-14">
            <DetailPage blog={blog} />
        </div>
    ) : <Loader />
};

export default BlogDetailPage;

export const generateMetadata = async ({ params }) => {
    const { id } = await params;
    const blog = await fetchBlog(id);

    return {
        title: `Blogger - ${blog.title}`,
        description: blog.description
    };
};