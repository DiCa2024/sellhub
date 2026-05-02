import { prisma } from "@/lib/prisma";
import SalesChannelPageClient from "./SalesChannelPageClient";

export default async function SalesChannelPage() {
  const [channels, sites, posts] = await Promise.all([
    prisma.salesChannel.findMany({
      include: {
        feeTables: true,
      },
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
  ]);

  return (
    <SalesChannelPageClient
      initialChannels={channels}
      initialSites={sites}
      initialPosts={posts}
    />
  );
}