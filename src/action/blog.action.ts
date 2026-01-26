"use server";

import { BlogData, blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.CreateBlogPost(data);
  updateTag("blogPosts");
  return res;
};
