import { blogService } from "@/services/blog.service";

const Homepage = async () => {
  const { data } = await blogService.getBlogPosts();
  console.log(data?.data?.data);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Homepage;
