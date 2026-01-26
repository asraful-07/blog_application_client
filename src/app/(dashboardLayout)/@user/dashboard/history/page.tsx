import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const response = await blogService.getBlogPosts({ page });

  const posts = response?.data?.data?.data || [];
  const pagination = response.data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  console.log(pagination);
  return (
    <div>
      <HistoryTable posts={posts} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
