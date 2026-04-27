import Hero from "@/components/Hero.jsx";
import Blogs from "@/components/Blogs.jsx";
import Loader from "@/components/Loader.jsx";
import { Suspense } from "react";

const Home = async () => {
  return (
    <main className="px-2 mt-20 sm:px-4 md:px-8 lg:px-15 transition-all duration-300">
      <Hero />
      <Suspense fallback={<Loader />}>
        <Blogs />
      </Suspense>
    </main>
  );
}

export default Home;

export const metadata = {
  title: "Blogger - Home Page",
  description: "Blogger is a web-site for fresh blogs."
};