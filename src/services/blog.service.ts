import { env } from "@/env";
import { cookies, headers } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}

export interface BlogData {
  title: string;
  content: string;
  tag?: string[];
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/api/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      // server site data post
      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(url.toString(), config);

      //? server site data post
      // const res = await fetch(url.toString(), {
      //   next: {
      //     tags: ["blogPosts"],
      //   },
      // });

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      console.error("An error occurred:", err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  GetBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/post/${id}`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      console.log("Something error", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  CreateBlogPost: async function (blogData: BlogData) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/post`, {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Post not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      console.error("An error occurred:", err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
