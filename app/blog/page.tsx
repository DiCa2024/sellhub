import { prisma } from "@/lib/prisma";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  const [posts, sites, channels] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.wholesaleSite.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.salesChannel.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <BlogPageClient
      initialPosts={posts}
      initialSites={sites}
      initialChannels={channels}
    />
  );
}