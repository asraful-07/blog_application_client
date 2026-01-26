import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFromClient";

export default function CreateBlogPage() {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      {/* <CreateBlogFromServer /> */}
      <CreateBlogFormClient />
    </div>
  );
}
