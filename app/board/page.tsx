export const revalidate = 60;
import { prisma } from "@/lib/prisma";
import BoardPageClient from "./BoardPageClient";

export default async function BoardPage() {
 const [posts, sites, blogs, channels] = await Promise.all([
  prisma.boardPost.findMany({
    orderBy: { createdAt: "desc" },
  }),
  prisma.wholesaleSite.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  }),
  prisma.blog.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  }),
  prisma.salesChannel.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  }),
]);

  return (
    <BoardPageClient
  initialPosts={posts}
  initialSites={sites}
  initialBlogs={blogs}
  initialChannels={channels}
/>
  );
}