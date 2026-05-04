export const revalidate = 60;
import { prisma } from "@/lib/prisma";
import SellertoolPageClient from "./SellertoolPageClient";

export default async function SellertoolPage() {
  const [sites, channels, posts] = await Promise.all([
    prisma.wholesaleSite.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.salesChannel.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <SellertoolPageClient
      initialSites={sites}
      initialChannels={channels}
      initialPosts={posts}
    />
  );
}