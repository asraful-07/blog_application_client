import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

//* fast data load (SSG)
export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();

  return data?.data?.data
    ?.map((blog: BlogPost) => ({ id: blog.id }))
    .splice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await blogService.GetBlogById(id);

  const post = data?.data;

  if (!post) {
    return <p>Post not found</p>;
  }

  const imageSrc =
    post.thumbnail && !post.thumbnail.includes("example.com")
      ? post.thumbnail
      : "/placeholder.png";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Thumbnail */}
      <div className="relative mb-6 h-72 w-full overflow-hidden rounded-lg">
        <Image src={imageSrc} alt={post.title} fill className="object-cover" />
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

      {/* Meta info */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>👁 {post.views} views</span>
        <span>💬 {post._count?.comments || 0} comments</span>
        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>

        {post.isFeatured && (
          <Badge className="bg-yellow-500 text-white">Featured</Badge>
        )}
      </div>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Content */}
      <article className="prose max-w-none">
        <p>{post.content}</p>
      </article>
    </div>
  );
}
