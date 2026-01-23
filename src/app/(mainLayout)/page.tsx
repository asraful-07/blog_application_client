import BlogCard from "@/components/modules/home/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const Homepage = async () => {
  const { data } = await blogService.getBlogPosts();

  const posts: BlogPost[] = data?.data?.data || [];

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-2xl font-bold">Home page</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
